import { FormArray } from '@angular/forms';

export class VariantsModel {
  id: number = 0;
  var_text: string = '';
}

export class QuestionModel {
  id: number = 0;
  question_text: string = '';
  variants: VariantsModel[] = [];

  constructor(setId?: number, setVariants?: VariantsModel) {
    this.id = setId;
    this.variants.push(setVariants)
    console.log(this.variants);
  }
}

export class TestModel {
  id: number;
  test_name: string;
  questions: QuestionModel[];
}
