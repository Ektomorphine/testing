import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'select-test-page',
  templateUrl: './select-test.page.html',
  styleUrls: ['./select-test.page.scss']
})
export class SelectTestPage {

  public tests = [];
  public testId: number;

  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute) {
    this.testId = _activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
    this._testService
      .getTest()
      .subscribe((data => {
        this.tests = data;
      })
    )
  }

  public chooseTest(item): void {

  }

}
