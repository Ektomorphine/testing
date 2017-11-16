import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'test-page',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage {

  public test = [];

  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute) {}

  // this._activatedRoute.snapshot.params['id']

  ngOnInit() {
    this._testService
      .getTest()
      .subscribe((data => {
        data.forEach(test => {
          if (test.id === +this._activatedRoute.snapshot.params['id']) {
            this.test.push(test);
          }
        })
      })
    )
  }



}
