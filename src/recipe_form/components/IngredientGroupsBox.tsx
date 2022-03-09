import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Input from '../../common/components/Input';
import IngredientGroups from '../../recipe/components/IngredientGroups';
import TabbedView from './TabbedView';
import formatQuantity from '../../recipe/utilts/formatQuantity';
import parseIngredient from '../utilts/parseIngredient';
import { Ingredient, IngredientGroup, IngredientInput } from '../../recipe/store/RecipeTypes';

export interface IIngredientGroupsBoxProps {
  name:     string;
  groups:   Array<IngredientGroup> | undefined;
  errors:   string | undefined;
  onChange: (name: string, value: unknown) => void;
}

function stringify(value: Array<IngredientGroup>): string {
  let tr = '';
  if (value) {
    value.filter(ig => ig.title.length > 0 || ig.ingredients.length > 0).forEach(ig => {
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
  if (tr.length > 3) {
    return tr.substring(0, tr.length - 2);
  }
  return tr;
}

function arrayify(value: string): Array<IngredientGroup> {
  const dict = [{ title: '', ingredients: [] }];
  let igTitle = '';
  let ings: Array<IngredientInput> | undefined = dict.find(t => t.title === '')?.ingredients; // Should always exist, as it is the init group.
  if (ings == null) throw new Error('Invalid state: ings may not be null.');
  if (value) {
    const tags = value.split('\n').filter(t => t.trim().length > 0);
    tags.forEach(line => {
      if (line.length > 0) {
        // Check if the line is an IG title
        // If line is IG title, update igTitle and continue
        // Else add ing to the current ig group
        if (line.includes(':') && line.length > 1) {
          igTitle = line.substring(0, line.length - 1);
          dict.push({ title: igTitle, ingredients: [] });
          ings = dict.find(t => t.title === igTitle)?.ingredients; // Should always exist, as we just pushed it.
          if (ings == null) throw new Error('Invalid state: The create ings may not be null.');
        } else {
          if (ings == null) throw new Error('Invalid state: ings may not be null.');
          ings.push(parseIngredient(line));
        }
      }
    });
  }
  return dict;
}

function isSameData(oldIg: Array<IngredientGroup> | undefined, newIg: Array<IngredientGroup> | undefined): boolean {
  const toString = (ing: Ingredient): string => `${String(ing.numerator)} ${String(ing.denominator)} ${ing.measurement} ${ing.title}`;

  const oldIgHash = oldIg?.map(ig => {
    let hash = ig.title;
    hash += ig.ingredients?.map(ing => toString(ing)).join(',') ?? '';
    return hash;
  }).join(';');

  const newIgHash = newIg?.map(ig => {
    let hash = ig.title;
    hash += ig.ingredients?.map(ing => toString(ing)).join(',') ?? '';
    return hash;
  }).join(';');

  return oldIgHash === newIgHash;
}

const IngredientGroupsBox: React.FC<IIngredientGroupsBoxProps> = ({
    name, groups, errors, onChange }: IIngredientGroupsBoxProps) => {
  const intl = useIntl();

  const { formatMessage } = intl;
  const messages = defineMessages({
    ingredients_label: {
      id: 'recipe.create.ingredients_label',
      description: 'Recipe ingredients label',
      defaultMessage: 'Ingredients',
    },
    info_tooltip: {
      id: 'recipe.create.ing.info_desc',
      description: 'info_desc',
      defaultMessage: 'Each Ingredient should be on its own line.',
    },
    ingredients_placeholder: {
      id: 'recipe.create.ing.ingredients_placeholder',
      description: 'Example for writing ingredients',
      defaultMessage: 'Dough:\n300 g flour\n100 ml milk\n\nDip:\n100 ml olive oil\n...',
    },
  });

  const [data, setData] = useState<Array<IngredientGroup>>(groups ?? []);
  const [text, setText] = useState<string>(stringify(groups ?? []));

  useEffect(() => {
    if (!isSameData(data, groups)) {
      setText(stringify(groups ?? []));
    }
    setData(groups ?? []);
  }, [groups]);

  const handleChange = (key: string, value: string) => {
    const list = arrayify(value);

    setData(list);
    setText(value);

    onChange(key, list);
  };

  return (
    <TabbedView
        label    = {formatMessage(messages.ingredients_label)}
        errors   = {errors}
        tooltip  = {formatMessage(messages.info_tooltip)}>
      <Input
          name   = {name}
          rows   = {8}
          placeholder = {formatMessage(messages.ingredients_placeholder)}
          change = {handleChange}
          value  = {text} />
      <div className='recipe-details'>
        <div className='recipe-schema'>
          <IngredientGroups groups={data} />
        </div>
      </div>
    </TabbedView>
  );
};

export default IngredientGroupsBox;
