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
export class TestPage implements OnInit {

  public test: TestModel;
  public questions: QuestionModel[] = [];
  public variants: VariantsModel[] = [];
  public iteration = 0;
  public timer = 30;
  private _subscription: Subscription;
  private _testResultsData: TestResult;

  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {}

  ngOnInit() {
    // Получение данных с сервера и распределение этих данных по массивам
    // для более удобного отображения данных в шаблоне.
    this._testService
      .getTest(+this._activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          this.test = data;
          // Устанавливает ID теста в объекте, хранящем результаты тестирования
          this._testResultsData = new TestResult(data.id);
          this.test.questions.forEach(item => {
            this.questions.push(item);
            item.variants.forEach(variants => {
              this.variants.push(variants);
            })
          })
        }
      )
    // Таймер теста.
    let timer = Observable.timer(2000,1000);
    this._subscription = timer.subscribe(seconds => {
        this.timer--;
        if (this.timer == 0) {
          this.iteration++;
          this.timer = 30;
          this.getAnswers();
          this.checkTestEnd()
        }
    });
  }

  // Проверяет, не закончился ли тест.
  // Если да, то отправляет данные с результатами ответов на сервер,
  // и редиректит на страницу выбора теста.
  public checkTestEnd() {
    if (this.iteration  == this.questions.length) {
      this._router.navigate(['/select']);
      this._testService.setAnswers(this._testResultsData)
    }
  }

  // Получает ответ на вопрос и переключает вопрос на следующий.
  public openNextQuestion(question, variant): void {
    this.timer = 30;
    this.iteration++;
    this.getAnswers(question, variant);
    this.checkTestEnd();
  }

  // Получает результат ответа на вопрос и сохраняет их.
  // Если ответ не был получен, то записывает null вместо результата ответа.
  public getAnswers(question?, variant?) {
    if (!question && !variant) {
      this._testResultsData
        .addElement(new TestAnswerResult(null, null));
    } else {
      this._testResultsData
        .addElement(new TestAnswerResult(question.id, variant.id));
    }
  }

  // Отписка при разрушении компонента
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
