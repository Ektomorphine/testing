export class VariantsModel {
  id: number = 0;
  var_text: string = '';
  question_id: number = 0;

  constructor(private _setId?: number, private _setQuestion_id?: number) {
    this.id = _setId;
    this.question_id = _setQuestion_id;
  }
}

export class QuestionModel {
  id: number = 0;
  question_text: string = '';
  variants: VariantsModel[] = [];

  constructor(private _setId?: number,private _newVariants?) {
    this.id = _setId;
    this.variants = _newVariants;
  }
}

export class TestModel {
  id: number;
  test_name: string;
  questions: QuestionModel[];
}
