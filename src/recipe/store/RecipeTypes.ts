import { Dispatch as ReduxDispatch } from 'redux';
import ItemReducerType from '../../common/store/ItemReducerType';
import { ACTION, GenericItemReducerAction } from '../../common/store/ReduxHelper';

export type Quantity = {
  numerator:   number;
  denominator: number;
  measurement: string;
}

export type Ingredient = {
  id:          number;
  title:       string;

  quantity?:   string;
  checked?:    boolean;

  measurement: string;
} & Quantity;

export type IngredientGroup = {
  title:       string;
  ingredients: Array<Ingredient>;
}

export type SubRecipeDto = {
  title:       string;
  slug:        string;
  child_recipe_id: number;
  parent_recipe_id?: number;

  measurement?: string;
} & Quantity;

export type SubRecipe = {
  title:       string;
  slug:        string;
  child_recipe_id:   number;
  parent_recipe_id?: number;
  measurement?: string;

  quantity?:   string;
  checked?:    boolean;
} & Quantity;

export const toSubRecipe = (dto: SubRecipeDto): SubRecipe => ({
  title: dto.title,
  slug:  dto.slug,
  child_recipe_id:  dto.child_recipe_id,
  parent_recipe_id: dto.parent_recipe_id,

  measurement: dto.measurement,
  numerator:   dto.numerator,
  denominator: dto.denominator,
});

export type Course = {
  id: number;
  title: string;
}

export type Cuisine = {
  id: number;
  title: string;
}

export type RecipeListDto = {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4

  photo_thumbnail?: string | null;

  info:     string;
  rating:   number;
  pub_date: string; // 2011-05-20
}

export type RecipeList = {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4

  photoThumbnail?: string;

  info:     string;
  rating:   number;
  pubDate:  Date; // 2011-05-20
}

export const toRecipeList = (dto: RecipeListDto): RecipeList => ({
  id:    dto.id,
  title: dto.title,
  slug:  dto.slug,

  photoThumbnail: dto.photo_thumbnail ?? undefined,

  info: dto.info,
  rating: dto.rating,
  pubDate: new Date(dto.pub_date),
});

export type RecipeDto = {
  username:    string;
  author:      number;
  source:      string;

  cook_time: number;
  prep_time: number;
  servings:  number;

  course: Course;
  cuisine: Cuisine;

  photo?: string | null;

  subrecipes: Array<SubRecipe>;
  ingredient_groups: Array<IngredientGroup>;
  tags: Array<string>;

  directions: string;

  public: boolean;
  update_date: string;

  customServings: number;
} & RecipeListDto;

export type Recipe = {
  username:    string;
  author:      number;
  source:      string;

  cookTime: number;
  prepTime: number;
  servings:  number;

  course: Course;
  cuisine: Cuisine;

  photo?: string;

  subrecipes: Array<SubRecipe>;
  ingredientGroups: Array<IngredientGroup>;
  tags: Array<string>;

  directions: string;

  public: boolean;
  updateDate: Date;

  customServings: number;
} & RecipeList;

export const toRecipe = (dto: RecipeDto): Recipe => ({
  id:    dto.id,
  title: dto.title,
  slug:  dto.slug,

  username: dto.username,
  author:   dto.author,
  source:   dto.source,

  cookTime: dto.cook_time,
  prepTime: dto.prep_time,
  servings: dto.servings,

  course:  dto.course,
  cuisine: dto.cuisine,

  photo: dto.photo ?? undefined,
  photoThumbnail: dto.photo_thumbnail ?? undefined,

  subrecipes: dto.subrecipes,
  ingredientGroups: dto.ingredient_groups,
  tags: dto.tags,

  directions: dto.directions,
  info: dto.info,

  rating: dto.rating,
  public: dto.public,
  pubDate: new Date(dto.pub_date),
  updateDate: new Date(dto.update_date),

  customServings: dto.servings,
});

export enum RecipeActionTypes {
  RECIPE_DELETE = 'RECIPE_DELETE',
  RECIPE_INGREDIENT = 'RECIPE_INGREDIENT',
  RECIPE_INGREDIENT_CHECK_INGREDIENT = 'RECIPE_INGREDIENT_CHECK_INGREDIENT',
  RECIPE_INGREDIENT_CHECK_SUBRECIPE = 'RECIPE_INGREDIENT_CHECK_SUBRECIPE',
  RECIPE_INGREDIENT_CHECK_ALL = 'RECIPE_INGREDIENT_CHECK_ALL',
  RECIPE_INGREDIENT_UNCHECK_ALL = 'RECIPE_INGREDIENT_UNCHECK_ALL',
  RECIPE_INGREDIENT_SERVINGS_UPDATE = 'RECIPE_INGREDIENT_SERVINGS_UPDATE',
  RECIPE_INGREDIENT_SERVINGS_RESET = 'RECIPE_INGREDIENT_SERVINGS_RESET',
  RECIPE_LIST_BLANK = 'RECIPE_LIST_BLANK',
  RECIPE_LIST_LOADING = 'RECIPE_LIST_LOADING',
  RECIPE_LIST_COMPLETE = 'RECIPE_LIST_COMPLETE',
  RECIPE_LIST_ERROR = 'RECIPE_LIST_ERROR',
}

export const RECIPE_STORE = '@@recipe';

export interface IRecipeDataAction {
  store: typeof RECIPE_STORE;
  type:  typeof ACTION.GET_SUCCESS;
  data:  Recipe;
}

export interface IRecipeSlugAction {
  store: typeof RECIPE_STORE;
  type:  typeof RecipeActionTypes.RECIPE_DELETE;
  data:  string;
}

export interface IRecipeIngredientUpdateServingAction {
  store: typeof RECIPE_STORE;
  type:  typeof RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE;
  recipeSlug:     string;
  customServings: number;
}

export interface IRecipeIngredientServingSimpleAction {
  store: typeof RECIPE_STORE;
  type: typeof RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_RESET
      | typeof RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL
      | typeof RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL;
  recipeSlug: string;
}

export interface IRecipeIngredientCheckIngredientAction {
  store: typeof RECIPE_STORE;
  type:  typeof RecipeActionTypes.RECIPE_INGREDIENT_CHECK_INGREDIENT;
  recipeSlug: string;
  id:    number;
  value: boolean;
}

export interface IRecipeIngredientCheckSubRecipeAction {
  store: typeof RECIPE_STORE;
  type:  typeof RecipeActionTypes.RECIPE_INGREDIENT_CHECK_SUBRECIPE;
  recipeSlug: string;
  id:    number;
  value: boolean;
}

export type RecipeState     = ItemReducerType<Recipe>;
export type RecipeAction    = IRecipeDataAction | IRecipeSlugAction | IRecipeIngredientUpdateServingAction
   | IRecipeIngredientServingSimpleAction | IRecipeIngredientCheckIngredientAction | IRecipeIngredientCheckSubRecipeAction | GenericItemReducerAction;
export type RecipeDispatch  = ReduxDispatch<RecipeAction>;
