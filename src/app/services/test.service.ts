import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const TESTS_URL = 'http://localhost:3000/tests';
const ANSWERS_URL = 'http://localhost:3001/results'

@Injectable()
export class TestService {

  constructor(private _testService: HttpClient) {}

  public getTest(id?: number): any {
    return this._testService.get(id ? TESTS_URL + '/' + id : TESTS_URL);
  }

  public setTest(body): any {
    return this._testService.post(TESTS_URL, body).subscribe();
  }

  public setAnswers(body): any {
    return this._testService.post(ANSWERS_URL, body).subscribe();
  }
}
