export class VariantsModel {
  id: number;
  var_text: string;
}

export class QuestionModel {
  id: number;
  question_text: string;
  variants: VariantsModel[];
}

export class TestModel {
  id: number;
  test_name: string;
  questions: QuestionModel[];

  constructor(model?) {}
}
