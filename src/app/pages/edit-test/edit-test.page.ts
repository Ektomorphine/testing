import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TestService } from '../../services/test.service';
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
export class EditTestPage implements OnInit, OnChanges, AfterViewInit {

  public test: TestModel;
  // public questions: QuestionModel[] = [];
  public newTestForm: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute,
              private _testService: TestService,
              private _formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this._testService.getTest(+this._activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          this.test = data;
          this.ngOnChanges()
          // this.test.questions.forEach(item => this.questions.push(item))
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

  public setForms(formItem: any, formType: string) {
    const ITEMS_FG = formItem.map(item => {
      let variants = item.variants.map(variant => {
        return this._formBuilder.group(variant)
      })
      variants = this._formBuilder.array(variants);
      item.variants = variants
      return this._formBuilder.group(item)
    })
    const ITEMS_FA = this._formBuilder.array(ITEMS_FG);
    this.newTestForm.setControl(formType, ITEMS_FA);
  }

  public addQuestion() {
    let questionCounter = this.questions.controls.length
    let x = this._formBuilder.array([]);
    x.push(this._formBuilder.group(new VariantsModel(0, questionCounter)))
    this.questions.push(this._formBuilder
      .group(new QuestionModel(questionCounter, x)));
  }

  public removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  public addVariant(i: number): void {
    let FormArray = <FormArray>this.questions.controls[i];
    let FormGroup = FormArray.controls['variants'];
    FormGroup.push(this._formBuilder
      .group(new VariantsModel(FormGroup.length, i)))
  }

  public removeVariant(i: number, j: number): void {
    let FormArray = <FormArray>this.questions.controls[i];
    let FormGroup = FormArray.controls['variants'];
    FormGroup.removeAt(j);
  }

  public saveNewTest(newTest): void {
    this._testService.updateTest(this.test.id, newTest.value);
    console.log('okSave');
  }

  revert() {
    this.newTestForm.reset();
  }

  func(item?) {
    console.log(this.questions.controls[0]['variants']);
  }

  ngAfterViewInit() {
    console.log(this.newTestForm.controls)
  }

}
