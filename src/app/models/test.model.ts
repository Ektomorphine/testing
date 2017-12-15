export class VariantsModel {
  id: number = 0;
  var_text: string = '';
  question_id: number = 0;

  constructor(setId?, setQuestion_id?) {
    this.id = setId;
    this.question_id = setQuestion_id;
  }
}

export class QuestionModel {
  id: number = 0;
  question_text: string = '';
  variants: VariantsModel[] = [];

  constructor(setId?: number, x?) {
    this.id = setId;
    this.variants = x;
  }
}

export class TestModel {
  id: number;
  test_name: string;
  questions: QuestionModel[];
}
