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

  constructor(private _http: HttpClient) {}
  // get tests from server
  public getTest(id?: number): any {
    return this._http.get(id ? TESTS_URL + '/' + id : TESTS_URL)
  }
  // send new test
  public setTest(body): any {
    return this._http.post(TESTS_URL, body).subscribe();
  }
  // send result of test
  public setAnswers(body): any {
    return this._http.post(ANSWERS_URL, body).subscribe();
  }

  public updateTest(id: number, body): any {
    console.log('okUpdste');
    return this._http.put(TESTS_URL + '/'+ id, body).subscribe();
  }
}
