import { Component, ViewChild } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextMenuComponent } from 'ngx-contextmenu';


@Component({
  selector: 'select-test-page',
  templateUrl: './select-test.page.html',
  styleUrls: ['./select-test.page.scss']
})
export class SelectTestPage {

  public tests = [];
  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit() {
    this._testService
      .getTest()
      .subscribe((data => {
        this.tests = data;
      })
    )
  }

  public openTest(test) {
    this._router.navigate(['/test', test.id])
  }

  public openTestEditor(test) {
    console.log('ok');
    this._router.navigate(['/edit', test.id])
  }
}
