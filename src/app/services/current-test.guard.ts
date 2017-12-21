import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { TestService } from './test.service';


@Injectable()
export class CurrentTestGuard implements CanActivate {

  private _isCurrentTest: boolean;

  constructor(private _testService: TestService,
              private _router: Router) { }

  canActivate() {
    this._isCurrentTest = true;
    this._testService.getCurrentTest().subscribe(
      data => {
        if (data.test_id) {
          this._isCurrentTest = false;
          this._router.navigate(['/test', data.test_id]);
        } else {
          this._isCurrentTest = true;
        }
      }
    );
    return this._isCurrentTest;
  }
}
