import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TestService } from './test.service';
import { TestResult } from '../models/test-result.model';


@Injectable()
export class CurrentTestGuard implements CanActivate {

  private _isCurrentTest: boolean;

  constructor(private _testService: TestService,
              private _router: Router) { }

  canActivate() {
    this._testService.getCurrentTest().subscribe(
      data => {
        if (data.test_id) {
          this._isCurrentTest = false;
          this._router.navigate(['/test', data.test_id])
        } else {
          this._isCurrentTest = true;
        }
      }
    )
    return this._isCurrentTest;
  }
}
