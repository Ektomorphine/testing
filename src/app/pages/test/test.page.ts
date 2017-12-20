import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TestModel,
  QuestionModel,
  VariantsModel
} from '../../models/test.model';
import * as moment from 'moment';
import { TestResult, TestAnswerResult } from '../../models/test-result.model';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'test-page',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage implements OnInit, OnDestroy {

  public test: TestModel;
  public questions: QuestionModel[] = [];
  public variants: VariantsModel[] = [];
  public iteration = 0;
  private _timer = 90;
  private _subscription: Subscription;
  private _testResultsData: TestResult;
  public formattedTimer: string;

  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {

  }

  ngOnInit() {
    this._testService
      .findTest(+this._activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          this.test = data;
          // Устанавливает ID теста в объекте, хранящем результаты тестирования
          this._testResultsData = new TestResult(data.id);
          this.test.questions.forEach(item => {
            this.questions.push(item);
            item.variants.forEach(variants => {
              this.variants.push(variants);
            });
          });
        }
      );
    this.buildOldTest();
    // Таймер теста.
    let timer = Observable.timer(250, 1000);
    this._subscription = timer.subscribe(seconds => {
        this.formattedTimer = moment.utc(this._timer * 1000).format('mm:ss');
        this._timer--;
        if (this._timer === 0) {
          this.iteration++;
          this._timer = 90;
          this.getAnswers();
          this.checkTestEnd();
        }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  canDeactivate(): boolean {
    if (this.iteration !== this.questions.length) {
      alert('Состояние теста сохранено');
      this.saveCurrentTest(this._testResultsData);
    }
    return true;
  }

  public buildOldTest() {
    this._testService.getCurrentTest().subscribe(data => {
      if (data.iteration >= 0) {
        this.iteration = data.iteration;
        this._testResultsData.answers = data.answers;
        this._timer = data.timeLeft;
      }
    });
  }

  public saveCurrentTest(data: TestResult): void {
    data.iteration = this.iteration;
    this._testService.createCurrentTest(data).subscribe();
  }

  public checkTestEnd() {
    if (this.iteration  === this.questions.length) {
      this._testService.makeCurrentTestEmpty({}).subscribe();
      this.saveResults();
    }
  }

  public saveResults(): void {
    this._testService.createAnswers(this._testResultsData).subscribe(
        succsess => {
          console.log('createAnswers ok');
          this._router.navigate(['/results', succsess.id]);
        }
      );
  }

  public openNextQuestion(question, variant): void {
    this._timer = 90;
    this.iteration++;
    this.getAnswers(question, variant);
    this.checkTestEnd();
  }

  public getAnswers(question?, variant?) {
    if (!question && !variant) {
      this._testResultsData
        .addElement(new TestAnswerResult(null, null));
    } else {
      this._testResultsData
        .addElement(new TestAnswerResult(question.id, variant.id));
    }
  }


}
