import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TestService } from '../../services/test.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
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
export class EditTestPage implements OnInit {

  public test: TestModel;
  public questions: QuestionModel[] = [];
  public variants: VariantsModel[] = [];
  public newTestForm: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute,
              private _testService: TestService,
              private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this._testService.getTest(+this._activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          this.test = data;
          this.setForm(data);
          // console.log(data.questions);
          // data.questions.forEach(item => console.log(item.variants));
          // this.test.questions.forEach(item => {
          //   this.questions.push(item);
          //   item.variants.forEach(variants => {
          //     this.variants.push(variants);
          //   })
          // })
        }
      )
  }

  public setForm(data): void {
      this.newTestForm = this._formBuilder.group({
      test_name: [ data.test_name, [Validators.required, Validators.minLength(5)]],
      questions: [ this._formBuilder.array([
                this.initQuestions(data)
              ])]
    })
      console.log(this.newTestForm.controls.questions.value.controls);
  }

  public initQuestions(data?): FormGroup {
    console.log(data.questions);
    return this._formBuilder.group({
      question_text: [ data.questions],
      id: '',
      variants: this._formBuilder.array([
        this.initVariants(data)
        ])
    })
  }

  public initVariants(data): FormGroup {
    return this._formBuilder.group({
      var_text: [ data.variants ],
      question_id: '',
      id: ''
    })
  }

  public addQuestion() {
    const CONTROL = <FormArray>this.newTestForm.controls['questions'];
    CONTROL.push(this.initQuestions());
  }

  hooj(item) {
    console.log(item);
  }

}
