import { Component, OnInit, OnChanges, Input } from '@angular/core';
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
export class EditTestPage implements OnInit, OnChanges {

  @Input() test: TestModel;

  public tests: TestModel;
  public questions: QuestionModel[] = [];
  public variants: VariantsModel[] = [];
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
          console.log('okInit');
          this.tests = data;
          this.createForm();
          this.ngOnChanges()
          this.tests.questions.forEach(item => {
            this.questions.push(item);
            item.variants.forEach(variants => {
              this.variants.push(variants);
            })
          })
        }
      )
  }

  ngOnChanges() {
      console.log(typeof(this.tests.questions), typeof(<VariantsModel[]>this.variants));
      this.newTestForm.reset({
        test_name: this.tests.test_name
      });
      this.setForms(<QuestionModel[]>this.tests.questions, 'questionForms');
      this.setForms(<VariantsModel[]>this.variants, 'variantForms');
  }

  public createForm(): void {
    this.newTestForm = this._formBuilder.group({
      test_name: ['', Validators.required],
      questionForms: this._formBuilder.array([]),
      variantForms: this._formBuilder.array([])
    });
  }

  public get questionForms(): FormArray {
    return this.newTestForm.get('questionForms') as FormArray;
  }

  public get variantForms(): FormArray {
    return this.newTestForm.get('variantForms') as FormArray;
  }

  public setForms(formItem: any, formType) {
    const ITEMS_FG = formItem.map(item => {
      console.log(item,'hooj');
      return this._formBuilder.group(item)
    })
    const ITEMS_FA = this._formBuilder.array(ITEMS_FG);
    this.newTestForm.setControl(formType, ITEMS_FA);
  }

  public addQuestion() {
    this.questionForms.push(this._formBuilder.group(new TestModel()));
  }

  revert() { this.ngOnChanges() }

  func() {
    console.log(this.questionForms, this.variantForms);
  }

}
