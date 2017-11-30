import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { TestModel } from '../../models/test.model';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'add-test-page',
  templateUrl: './add-test.page.html',
  styleUrls: ['./add-test.page.scss']
})
export class AddTestPage {
  public testForm: FormGroup;
  private _questionId = 0;

  constructor(private _formBuilder: FormBuilder,
              private _testService: TestService,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.testForm = this._formBuilder.group({
      test_name: ['', [Validators.required, Validators.minLength(5)]],
      questions: this._formBuilder.array([
        this.initQuestions()
        ])
    })
  }

  public initQuestions(): FormGroup {
    return this._formBuilder.group({
      question_text: ['',[Validators.required, Validators.minLength(5)]],
      id: this._questionId,
      variants: this._formBuilder.array([
        this.initVariants()
        ])
    })
  }

  public openSnackBar() {
    this.snackBar.open('Готово!', '', {
      duration: 1500
    });
  }


  public addQuestion() {
    this._questionId++;
    const CONTROL = <FormArray>this.testForm.controls['questions'];
    CONTROL.push(this.initQuestions());
  }

  public save(model) {
    this._testService.setTest(model.value);
    this.openSnackBar();
  }

  public removeQuestions(i: number) {
    const CONTROL = <FormArray>this.testForm.controls['questions'];
    CONTROL.removeAt(i)
  }

  public initVariants(): FormGroup {
    return this._formBuilder.group({
      var_text: '',
      question_id: this._questionId
    })
  }

  public addVariant(question) {
    let questionsForms = <FormArray>this.testForm.controls['questions'];
    let variantsForms =  <FormArray>questionsForms.controls[question.controls.id.value];
    const CONTROL = variantsForms.controls['variants'];
    CONTROL.push(this.initVariants());
  }

  public removeVariant(j: number, question) {
    let questionsForms = <FormArray>this.testForm.controls['questions'];
    let variantsForms =  <FormArray>questionsForms.controls[question.controls.id.value];
    const CONTROL = variantsForms.controls['variants'];
    CONTROL.removeAt(j)
  }

  public hooj(item?): void {
    console.log(this.testForm.valid);
  }
}
