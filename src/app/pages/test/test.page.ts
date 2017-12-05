import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TestModel,
  QuestionModel,
  VariantsModel
} from '../../models/test.model';
import { TestResult, TestAnswerResult } from '../../models/answers.model';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'test-page',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage implements OnInit{

  public test: TestModel;
  public questions: QuestionModel[] = [];
  public variants: VariantsModel[] = [];
  public iteration = 0;
  public timer = 30;
  private subscription: Subscription;
  private _submitTestModel: TestResult;

  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {}

  ngOnInit() {
    this._testService
      .getTest(+this._activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          this.test = data;
          this._submitTestModel = new TestResult(data.id);
          this.test.questions.forEach(item => {
            this.questions.push(item);
            item.variants.forEach(variants => {
              this.variants.push(variants);
            })
          })
        }
      )
    let timer = Observable.timer(2000,1000);
    this.subscription = timer.subscribe(seconds => {
        this.timer--;
        if (this.timer == 0) {
          this.iteration++;
          this.timer = 30;
          this.getAnswers();
          this.checkTestEnd()
        }
    });
  }

  public checkTestEnd() {
    if (this.iteration  == this.questions.length) {
      this._router.navigate(['/select']);
      alert('Test done!');
      this._testService.setAnswers(this._submitTestModel)
    }
  }

  public openNextQuestion(question, variant): void {
    this.timer = 30;
    this.iteration++;
    this.getAnswers(question, variant);
    this.checkTestEnd();
  }

  public getAnswers(question?, variant?) {
    if (!question && !variant) {
      this._submitTestModel
        .addElement(new TestAnswerResult(null, null));
    } else {
      this._submitTestModel
        .addElement(new TestAnswerResult(question.id, variant.id));
    }
  }

  public splitCodeMarkdown(arg) {
    let subString = arg.split(' ');
    subString.forEach((newString, index) => {
      if (subString.indexOf('```') == 0) {
        subString[index] = `\n${newString}\n`;
      }
    })
    return arg = subString.join(' ');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
