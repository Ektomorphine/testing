import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { TestModel } from '../../models/test.model';


@Component({
  selector: 'select-test-page',
  templateUrl: './select-test.page.html',
  styleUrls: ['./select-test.page.scss']
})
export class SelectTestPage implements OnInit {

  public tests: TestModel[] = [];
  constructor(private _testService: TestService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit() {
    this._testService.getTests()
      .subscribe(data => this.tests = data);
  }

  public openTest(test): void {
    this._router.navigate(['/test', test.id]);
  }

  public openTestEditor(test): void {
    this._router.navigate(['/edit', test.id]);
  }

  public deleteTest(testIndex): void {
    this._testService.deleteTest(this.tests[testIndex].id).subscribe();
    this.tests.splice(testIndex, 1);
  }
}
