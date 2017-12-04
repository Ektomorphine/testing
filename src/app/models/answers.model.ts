export class TestResult {
  test_id: number;
  answers: TestAnswerResult[] = [];
  constructor( setTestId: number) {
    this.test_id = setTestId;
  }

  public addElement(item: TestAnswerResult) {
    this.answers.push(item)
  }
}

export class TestAnswerResult {
  questionId: number;
  answerId: number;
  constructor(question, answer) {
    this.questionId = question,
    this.answerId = answer
  }
}
