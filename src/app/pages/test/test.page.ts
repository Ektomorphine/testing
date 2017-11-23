import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute } from '@angular/router';
import { TestModel, QuestionModel, VariantsModel } from '../../models/test.model';
import { Observable } from 'rxjs/Rx';


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
  public ticks = 30;

  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this._testService
      .getTest(+this._activatedRoute.snapshot.params['id'])
      .subscribe(
        data => {
          this.test = data;
          this.test.questions.forEach(item => {
            this.questions.push(item);
            item.variants.forEach(variants => {
              this.variants.push(variants);
            })
          })
        }
      )
    let timer = Observable.timer(2000,1000);
    timer.subscribe(t => {
        this.ticks--;
        console.log(t);
        if (this.ticks == 0) {
          this.iteration++;
          this.ticks = 30;
        }
    });
  }

  public openNextQuestion(): void {
    this.iteration++;
  }

  public nextQuestion(item): void {
    this.ticks = 30;
    this.iteration++;
  }
}
