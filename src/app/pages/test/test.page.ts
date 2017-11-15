import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'test-page',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage {

  public tests = [];

  constructor(private _testService: TestService) {}

  ngOnInit() {
    this._testService
      .getTest()
      .subscribe((data => {
        this.tests = data;
        setTimeout(() => console.log(this.tests), 500)

      }));

  }
}
