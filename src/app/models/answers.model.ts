export class TestResult {
  test_id: number;
  answers: TestAnswerResult[] = [];

  constructor(setTestId: number) {
    this.test_id = setTestId;
  }

  public addElement(item: TestAnswerResult) {
    this.answers.push(item)
  }
}

export class TestAnswerResult {
  questionId: number;
  answerId: number;

  constructor(question: number, answer: number) {
    this.questionId = question,
    this.answerId = answer
  }
}


// Если установить аргументам контрукторов модификаторы доступа private, то они
// тоже добавляются в результаты ответов .
