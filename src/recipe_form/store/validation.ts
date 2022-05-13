import { numberValidator, requiredValidator, ValidationErrorType, ValidatorsType } from '../../common/store/Validation';
import { IngredientGroup, Recipe } from '../../recipe/store/RecipeTypes';
import formatQuantity from '../../recipe/utilts/formatQuantity';

const ingRequiredValidator = (name: string, val: Array<IngredientGroup>, obj?: Recipe): ValidationErrorType | undefined => {
  if (obj != null && obj.subrecipes != null && obj.subrecipes.length > 0) return undefined;

  let tr = '';
  if (val) {
    val.forEach(ig => {
      if (ig.title) {
        tr += `${ig.title}:\n`;
      }
      ig.ingredients.forEach(i => {
        tr += i.numerator ? `${formatQuantity(1, 1, i.numerator, i.denominator)} ` : '';
        tr += i.measurement ? `${i.measurement} ` : '';
        tr += `${i.title}\n`;
      });
      tr += '\n';
    });
  }

  return tr.trim() === '' ? {
    code:      'required',
    message:   'This Field is Required.',
    attribute: name,
  } : undefined;
};

const validators: ValidatorsType = [
  { name: 'cookTime'        , validators: [numberValidator] },
  { name: 'ingredientGroups', validators: [ingRequiredValidator] },
  { name: 'servings'        , validators: [requiredValidator, numberValidator] },
  { name: 'prepTime'        , validators: [numberValidator] },
  { name: 'title'           , validators: [requiredValidator] },
];

export default validators;
