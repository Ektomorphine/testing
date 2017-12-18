export class TestResult {
  test_id: number;
  answers: TestAnswerResult[] = [];

  constructor(private _setTestId: number) {
    this.test_id = _setTestId;
  }

  public addElement(item: TestAnswerResult) {
    this.answers.push(item)
  }
}

export class TestAnswerResult {
  questionId: number;
  answerId: number;

  constructor(private _question: number, private _answer: number) {
    this.questionId = _question,
    this.answerId = _answer
  }
}
