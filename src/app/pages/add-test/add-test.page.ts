import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { TestModel } from '../../models/test.model';
import { MatSnackBar } from '@angular/material';
import { PreviewPage } from '../preview/preview.page';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'add-test-page',
  templateUrl: './add-test.page.html',
  styleUrls: ['./add-test.page.scss']
})
export class AddTestPage {
  public testForm: FormGroup;
  public markdownPreview = '**Example**';
  private _questionId = 0;
  private _variantId = 0;

  constructor(private _formBuilder: FormBuilder,
              private _testService: TestService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.testForm = this._formBuilder.group({
      test_name: [' ', [Validators.required, Validators.minLength(5)]],
      questions: this._formBuilder.array([
        this.initQuestions()
      ])
    })
  }

  public initQuestions(): FormGroup {
    return this._formBuilder.group({
      question_text: [' ', [Validators.required, Validators.minLength(5)]],
      id: this._questionId,
      variants: this._formBuilder.array([
        this.initVariants()
      ])
    })
  }

  public openSnackBarOnSend(): void {
    this.snackBar.open('Готово!', ':>', {
      duration: 1500
    });
  }

  public openDialogPreviewPage(): void {
   let dialog = this.dialog.open(PreviewPage, {
     width: '100%',
     data: {preview: this.markdownPreview}
   });

   dialog.afterClosed()
     .subscribe(result => {
       this.markdownPreview = result;
     });
  }

  public addQuestion(): void {
    this._questionId++;
    this._variantId = 0;
    const CONTROL = <FormArray>this.testForm.controls['questions'];
    CONTROL.push(this.initQuestions());
  }

  public saveTest(testResult): void {
    this._testService
      .setTest(testResult.value);
    this.openSnackBarOnSend();
  }

  public removeQuestions(questionIndex: number): void {
    const CONTROL = <FormArray>this.testForm.controls['questions'];
    CONTROL.removeAt(questionIndex)
  }

  public initVariants(): FormGroup {
    return this._formBuilder.group({
      var_text: '',
      question_id: this._questionId,
      id: this._variantId
    })
  }

  public addVariant(question): void {
    this._variantId++;
    // find *questions* FormArray
    let questionsForms = <FormArray>this.testForm.controls['questions'];
    // Select FormGroup from FormArray by ID and convert it to FormArray
    let variantsForms =  <FormArray>questionsForms.controls[question.controls.id.value];
    const CONTROL = variantsForms.controls['variants'];
    CONTROL.push(this.initVariants());
  }

  public removeVariant(variantIndex: number, question): void {
    let questionsForms = <FormArray>this.testForm.controls['questions'];
    let variantsForms =  <FormArray>questionsForms.controls[question.controls.id.value];
    const CONTROL = variantsForms.controls['variants'];
    CONTROL.removeAt(variantIndex)
  }
}
