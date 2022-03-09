import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';

import '../css/smart_text_box.css';

import SubRecipes from '../../recipe/components/SubRecipes';
import TabbedView from './TabbedView';
import formatQuantity from '../../recipe/utilts/formatQuantity';
import parseIngredient from '../utilts/parseIngredient';
import { SubRecipe } from '../../recipe/store/RecipeTypes';
import { AutocompleteListItem } from '../store/types';

export interface ISubRecipeBoxProps {
  name:       string;
  subrecipes: Array<SubRecipe> | undefined;
  errors:     string | undefined;

  fetchRecipeList: (searchTerm: string) => Promise<Array<AutocompleteListItem>>;
  onChange: (name: string, value: Array<SubRecipe>) => void;
}

function stringify(value: Array<SubRecipe>) {
  let tr = '';
  if (value) {
    // eslint-disable-next-line
    value.map(i => {
      tr += i.numerator ? `${formatQuantity(1, 1, i.numerator, i.denominator)} ` : '';
      tr += i.measurement ? `${i.measurement} ` : '';
      tr += `${i.title}\n`;
    });
  }
  return tr.substring(0, tr.length - 1);
}

function arrayify(value: string): Array<SubRecipe> {
  const ings: Array<SubRecipe> = [];
  const subRecipes = value.split('\n').filter(t => t.trim().length > 1);
  subRecipes.forEach(sr => {
    if (sr.length > 0) {
      ings.push(parseIngredient(sr) as SubRecipe);
    }
  });
  return ings;
}

function isSameData(oldSr: Array<SubRecipe> | undefined, newSr: Array<SubRecipe> | undefined): boolean {
  const toString = (sr: SubRecipe): string => `${String(sr.numerator)} ${String(sr.denominator)} ${sr.measurement} ${sr.title}`;

  const oldSrHash = oldSr?.map(sr => toString(sr)).join(',') ?? '';
  const newSrHash = newSr?.map(sr => toString(sr)).join(',') ?? '';

  return oldSrHash === newSrHash;
}

interface IItemProps {
  entity: AutocompleteListItem;
}
const Item    = ({ entity: { name } }: IItemProps) => <div>{`${name}`}</div>;
const Loading = () => <div className='loading'>Loading...</div>;

const SubRecipeBox: React.FC<ISubRecipeBoxProps> = ({
    name, subrecipes, errors, fetchRecipeList, onChange }: ISubRecipeBoxProps) => {
  const intl = useIntl();

  const { formatMessage } = intl;
  const messages = defineMessages({
    subrecipes_label: {
      id: 'recipe.create.subrecipes_label',
      description: 'Recipe links label',
      defaultMessage: 'Recipe links',
    },
    subrecipes_tooltip: {
      id: 'recipe.create.subrecipes.tooltip',
      description: 'Subrecipes tooltip',
      defaultMessage: 'If the recipe is made of several subrecipes, then link them here. Each Recipe Link should be on its own line.',
    },
    subrecipes_placeholder: {
      id: 'recipe.create.subrecipes.placeholder',
      description: 'Subreceipes placeholder',
      defaultMessage: ':dough-1\n:olive-oil-dip-1',
    },
  });

  const [data, setData] = useState<Array<SubRecipe>>(subrecipes ?? []);
  const [text, setText] = useState<string>(stringify(subrecipes ?? []));

  useEffect(() => {
    if (!isSameData(data, subrecipes)) {
      setText(stringify(subrecipes ?? []));
    }
    setData(subrecipes ?? []);
  }, [subrecipes]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val  = event.target.value;
    if (val === text) return;
    const list = arrayify(val);

    setData(list);
    setText(val);

    onChange(name, list);
  };

  return (
    <TabbedView
        label  = {formatMessage(messages.subrecipes_label)}
        errors = {errors}
        tooltip = {formatMessage(messages.subrecipes_tooltip)}>
      <div className='form-group'>
        <ReactTextareaAutocomplete<AutocompleteListItem>
            value = {text}
            onChange = {handleChange}
            rows = {4}
            placeholder = {formatMessage(messages.subrecipes_placeholder)}
            loadingComponent = {Loading}
            className = 'form-control'
            trigger={{
            ':': {
              dataProvider: token => fetchRecipeList(token),
              component: Item,
              output: item => item.char,
            },
          }} />
      </div>
      <div className='recipe-details'>
        <div className='recipe-schema'>
          <SubRecipes subRecipes={data} />
        </div>
      </div>
    </TabbedView>
  );
};

export default SubRecipeBox;
