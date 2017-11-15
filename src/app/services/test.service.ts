import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export const URL = 'http://localhost:3000/tests';

@Injectable()
export class TestService {

  constructor(private _testService: HttpClient) {}

  public getTest(): any {
    return this._testService.get(URL);
  }
}
