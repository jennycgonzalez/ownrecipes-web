import React, { useContext, useEffect, useState } from 'react';
import { defineMessages, IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';

import '../css/smart_text_box.css';

import Input from '../../common/components/Input';
import IngredientGroups from '../../recipe/components/IngredientGroups';
import TabbedView from './TabbedView';
import formatQuantity from '../../recipe/utilts/formatQuantity';
import parseIngredient from '../utilts/parseIngredient';
import { Ingredient, IngredientGroup, IngredientInput, SubRecipe } from '../../recipe/store/RecipeTypes';
import SubRecipes from '../../recipe/components/SubRecipes';
import { AutocompleteListItem } from '../store/types';
import MeasurementContext from '../../common/context/MeasurementContext';
import useCrash from '../../common/hooks/useCrash';

export interface IIngredientGroupsBoxProps {
  name:     string;
  errors:   string | undefined;

  groups:   Array<IngredientGroup> | undefined;
  subrecipes: Array<SubRecipe> | undefined;

  fetchRecipeList: (searchTerm: string) => Promise<Array<AutocompleteListItem>>;
  onChange: (name: string, value: unknown) => void;
}

/* IngredientGroups */

function igStringify(intl: IntlShape, formatter: Record<string, string>, values: Array<IngredientGroup>): string {
  let tr = '';
  if (values) {
    values.filter(ig => ig.title.trim().length > 0 || ig.ingredients.length > 0).forEach(ig => {
      if (ig.title) {
        tr += `${ig.title}:\n`;
      }
      ig.ingredients.forEach(i => {
        const locMsrmnt = i.measurement ? formatter[i.measurement] : '';
        tr += i.numerator ? `${formatQuantity(1, 1, i.numerator, i.denominator)} ` : '';
        tr += locMsrmnt ? `${(intl as IntlShape).formatMessage({ id: `measurement.${locMsrmnt.toLocaleLowerCase()}` }, { itemCount: i.numerator })} ` : '';
        tr += `${i.title}\n`;
      });
      tr += '\n';
    });
  }
  if (tr.endsWith('\n')) {
    return tr.substring(0, tr.length - 2);
  }
  return tr;
}

function normalizeLine(line: string): string {
  let res = line.replace(/\t/g, ' ');
  res = res.trim();
  return res;
}

function igArrayify(parser: Record<string, string>, value: string): Array<IngredientGroup> {
  const dict = [{ title: '', ingredients: [] }];
  let igTitle = '';
  let ings: Array<IngredientInput> | undefined = dict.find(t => t.title === '')?.ingredients; // Should always exist, as it is the init group.
  if (ings == null) throw new Error('Invalid state: ings may not be null.');
  if (value) {
    const tags = value.split('\n').map(line => normalizeLine(line)).filter(t => t.length > 0);
    tags.forEach(line => {
      if (line.length > 0) {
        // Check if the line is an IG title
        // If line is IG title, update igTitle and continue
        // Else add ing to the current ig group
        if (line.endsWith(':') && line.length > 1) {
          igTitle = line.substring(0, line.length - 1);
          dict.push({ title: igTitle, ingredients: [] });
          ings = dict.find(t => t.title === igTitle)?.ingredients; // Should always exist, as we just pushed it.
          if (ings == null) throw new Error('Invalid state: The create ings may not be null.');
        } else {
          if (ings == null) throw new Error('Invalid state: ings may not be null.');
          ings.push(parseIngredient(parser, line));
        }
      }
    });
  }
  return dict;
}

function isSameIgData(oldIg: Array<IngredientGroup> | undefined, newIg: Array<IngredientGroup> | undefined): boolean {
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

/* SubRecipe */

function srStringify(intl: IntlShape, formatter: Record<string, string>, values: Array<SubRecipe>) {
  let tr = '';
  if (values) {
    values.forEach(i => {
      const locMsrmnt = i.measurement ? formatter[i.measurement] : '';
      tr += i.numerator ? `${formatQuantity(1, 1, i.numerator, i.denominator)} ` : '';
      tr += locMsrmnt ? `${(intl as IntlShape).formatMessage({ id: `measurement.${locMsrmnt.toLocaleLowerCase()}` }, { itemCount: i.numerator })} ` : '';
      tr += `${i.title}\n`;
    });
  }
  return tr.substring(0, tr.length - 1);
}

function srArrayify(parser: Record<string, string>, value: string): Array<SubRecipe> {
  const ings: Array<SubRecipe> = [];
  const subRecipes = value.split('\n').map(line => normalizeLine(line)).filter(t => t.length > 1 && !t.startsWith(':'));
  subRecipes.forEach(sr => {
    if (sr.length > 0) {
      ings.push(parseIngredient(parser, sr) as SubRecipe);
    }
  });
  return ings;
}

function isSameSrData(oldSr: Array<SubRecipe> | undefined, newSr: Array<SubRecipe> | undefined): boolean {
  const toString = (sr: SubRecipe): string => `${String(sr.numerator)} ${String(sr.denominator)} ${sr.measurement} ${sr.title}`;

  const oldSrHash = oldSr?.map(sr => toString(sr)).join(',') ?? '';
  const newSrHash = newSr?.map(sr => toString(sr)).join(',') ?? '';

  return oldSrHash === newSrHash;
}

interface IItemProps {
  entity: AutocompleteListItem;
}
const Item = ({ entity: { char } }: IItemProps) => <div>{char}</div>;
const Loading = () => <div className='loading'>Loading...</div>;

const IngredientGroupsBox: React.FC<IIngredientGroupsBoxProps> = ({
    name, groups, subrecipes, errors, fetchRecipeList, onChange }: IIngredientGroupsBoxProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    ingredients_label: {
      id: 'recipe.create.ingredients_label',
      description: 'Recipe ingredients label',
      defaultMessage: 'Ingredients',
    },
    ingredients_tooltip: {
      id: 'recipe.create.ing.info_desc',
      description: 'info_desc',
      defaultMessage: 'Each Ingredient should be on its own line. You can form groups by ending the groups first line with a colon (":").',
    },
    ingredients_placeholder: {
      id: 'recipe.create.ing.ingredients_placeholder',
      description: 'Example for writing ingredients',
      defaultMessage: 'Dough:\n300 g flour\n100 ml milk\n\nDip:\n100 ml olive oil\n...',
    },

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

  const location = useLocation();
  const crash = useCrash();
  const [activeTab, setActiveTab] = useState<string>('0');

  useEffect(() => {
    if (location.pathname.endsWith('/create')) {
      setActiveTab('0');
    }
  }, [location.pathname]);

  const measurementsContext = useContext(MeasurementContext);

  const [igData, setIgData] = useState<Array<IngredientGroup>>(groups ?? []);
  const [igText, setIgText] = useState<string>(igStringify(intl, measurementsContext?.formatter ?? {}, groups ?? []));

  const [srData, setSrData] = useState<Array<SubRecipe>>(subrecipes ?? []);
  const [srText, setSrText] = useState<string>(srStringify(intl, measurementsContext?.formatter ?? {}, subrecipes ?? []));

  useEffect(() => {
    if (!isSameIgData(igData, groups)) {
      setIgText(igStringify(intl, measurementsContext?.formatter ?? {}, groups ?? []));
    }
    setIgData(groups ?? []);
  }, [groups, measurementsContext?.formatter]);

  const handleIgChange = (key: string, value: string) => {
    let list: Array<IngredientGroup>;
    try {
      list = igArrayify(measurementsContext?.parser ?? {}, value);
    } catch (err) {
      crash(err);
      return;
    }

    setIgData(list);
    const text = igStringify(intl, measurementsContext?.formatter ?? {}, list);
    setIgText(text);

    onChange(key, list);
  };

  useEffect(() => {
    if (!isSameSrData(srData, subrecipes)) {
      setSrText(srStringify(intl, measurementsContext?.formatter ?? {}, subrecipes ?? []));
    }
    setSrData(subrecipes ?? []);
  }, [subrecipes, measurementsContext?.formatter]);

  const handleSrChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val  = event.target.value;
    if (val === srText) return;
    const list = srArrayify(measurementsContext?.parser ?? {}, val);

    setSrData(list);
    setSrText(val);

    onChange(event.target.name, list);
  };

  return (
    <TabbedView
        id       = 'ingredients'
        labels   = {[formatMessage(messages.ingredients_label), formatMessage(messages.subrecipes_label)]}

        activeTab = {activeTab}
        onSelect  = {setActiveTab}

        errors   = {errors}
        tooltips = {[formatMessage(messages.ingredients_tooltip), formatMessage(messages.subrecipes_tooltip)]}>
      <Input
          name     = {name}
          value    = {igText}
          rows     = {8}
          placeholder = {formatMessage(messages.ingredients_placeholder)}
          required = {srData.length === 0}
          onChange = {handleIgChange} />
      <div className='form-group'>
        <ReactTextareaAutocomplete<AutocompleteListItem>
            name = 'subrecipes'
            value = {srText}
            onChange = {handleSrChange}
            rows = {8}
            placeholder = {formatMessage(messages.subrecipes_placeholder)}
            loadingComponent = {Loading}
            className = 'form-control'
            movePopupAsYouType
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
          <article className='ingredients-panel'>
            <div className='ingredient-groups'>
              <SubRecipes subRecipes={srData} />
              <IngredientGroups groups={igData} hasSubrecipes={srData.length > 0} />
            </div>
          </article>
        </div>
      </div>
    </TabbedView>
  );
};

export default IngredientGroupsBox;
