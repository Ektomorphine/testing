import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TestService } from '../../services/test.service';
import { MatSnackBar } from '@angular/material';
import {
  TestModel,
  QuestionModel,
  VariantsModel
} from '../../models/test.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'edit-test-page',
  templateUrl: './edit-test.page.html',
  styleUrls: ['./edit-test.page.scss']
})
export class EditTestPage implements OnInit, OnChanges {
  public test: TestModel;
  public newTestForm: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute,
              private _testService: TestService,
              private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit() {
    this._testService.findTest(+this._activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          this.test = data;
          this.ngOnChanges();
        }
      )
  }

  ngOnChanges() {
      this.newTestForm.reset({
        test_name: this.test.test_name
      });
      this.setForms(<QuestionModel[]>this.test.questions, 'questions');
  }

  public createForm(): void {
    this.newTestForm = this._formBuilder.group({
      test_name: ['', [Validators.required, Validators.minLength(5)]],
      questions: [this._formBuilder.array([]), Validators.required]
    });
  }

  public get questions(): FormArray {
    return this.newTestForm.get('questions') as FormArray;
  }

  public setForms(formItem, formType: string): void {
    const ITEMS_FG = formItem.map(item => {
      let variants = item.variants.map(variant => {
        return this._formBuilder.group(variant);
      })
      variants = this._formBuilder.array(variants);
      item.variants = variants;
      return this._formBuilder.group(item);
    })
    const ITEMS_FA = this._formBuilder.array(ITEMS_FG);
    this.newTestForm.setControl(formType, ITEMS_FA);
  }

  public addQuestion(): void {
    let questionCounter = this.questions.controls.length;
    let newQuestion = this._formBuilder.array([]);
    newQuestion.push(this._formBuilder.group(new VariantsModel(0, questionCounter)))
    this.questions.push(this._formBuilder
      .group(new QuestionModel(questionCounter, newQuestion)));
  }

  public removeQuestion(questionIndex: number): void {
    this.questions.removeAt(questionIndex);
  }

  public addVariant(questionIndex: number): void {
    let FormArray = <FormArray>this.questions.controls[questionIndex];
    let FormGroup = FormArray.controls['variants'];
    FormGroup.push(this._formBuilder
      .group(new VariantsModel(FormGroup.length, questionIndex)));
  }

  public removeVariant(questionIndex: number, variantIndex: number): void {
    let FormArray = <FormArray>this.questions.controls[questionIndex];
    let FormGroup = FormArray.controls['variants'];
    FormGroup.removeAt(variantIndex);
  }

  public openSnackBarOnSend(): void {
    this._snackBar.open('Готово!', ':>', {
      duration: 1500
    });
  }

  public saveNewTest(newTest): void {
    this._testService.updateTest(this.test.id, newTest.value).subscribe();
    this.openSnackBarOnSend()
  }
}
