import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TestModel } from '../models/test.model';
import { TestResult } from '../models/test-result.model';

const TESTS_URL = 'http://localhost:3000/tests';
const ANSWERS_URL = 'http://localhost:3000/answers'
const CURRENT_TEST_URL = 'http://localhost:3000/current_test'

@Injectable()
export class TestService {

  constructor(private _http: HttpClient) {}

  public getTests(): Observable<TestModel[]> {
    return this._http.get<TestModel[]>(TESTS_URL)
  }

  public findTest(id: number): Observable<TestModel> {
    return this._http.get<TestModel>(`${TESTS_URL}/${id}`);
  }

  public createTest(data: TestModel): Observable<TestModel> {
    return this._http.post<TestModel>(TESTS_URL, data);
  }

  public createAnswers(data: TestResult): Observable<TestResult> {
    return this._http.post<TestResult>(ANSWERS_URL, data);
  }

  public updateTest(id: number, data: TestModel): Observable<TestModel> {
    return this._http.put<TestModel>(`${TESTS_URL}/${id}`, data);
  }

  public deleteTest(id: number): Observable<TestModel> {
    return this._http.delete<TestModel>(`${TESTS_URL}/${id}`)
  }

  public getAnswers(id: number): Observable<TestResult> {
    // return Observable.create((observer: Observer<TestResult>) => {
    //   this._http
    //     .get<TestResult>(`${ANSWERS_URL}/${id}`)
    //     .subscribe(resp => {
    //       observer.next(resp);
    //       observer.complete();
    //     })
    // })
    return this._http.get<TestResult>(`${ANSWERS_URL}/${id}`);
  }

  public createCurrentTest(data: TestResult): Observable<TestResult> {
    return this._http.post<TestResult>(CURRENT_TEST_URL, data)
  }

  public getCurrentTest(): Observable<TestResult> {
    return this._http.get<TestResult>(CURRENT_TEST_URL);
  }

  public makeCurrentTestEmpty(data): Observable<TestResult> {
    return this._http.post<TestResult>(CURRENT_TEST_URL, data)
  }
}
