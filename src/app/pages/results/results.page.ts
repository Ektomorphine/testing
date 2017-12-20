import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from '../../models/test-result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss']
})
export class ResultsPage implements OnInit {

  public answers: TestResult;

  constructor(private _testService: TestService,
              private _route: ActivatedRoute) {}

  ngOnInit() {
    this._testService.getAnswers(this._route.snapshot.params['id'])
      .subscribe(
        data => {
         this.answers = data;
      }
    )
  }
}
