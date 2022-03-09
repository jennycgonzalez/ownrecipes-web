import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
import * as _ from 'lodash';

import Search from '../components/Search';

import * as RecipeActions from '../../recipe/store/RecipeActions';
import * as SearchActions from '../store/SearchActions';
import * as FilterActions from '../store/FilterActions';
import DefaultFilters from '../constants/DefaultFilters';
import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';
import { RecipeList } from '../../recipe/store/RecipeTypes';

function mergeDefaultFilters(query: queryString.ParsedQuery<string | number | boolean>) {
  const filter: Record<string, unknown> = {};

  Object.keys(DefaultFilters).forEach(key => {
    filter[key] = _.get(DefaultFilters, key);
  });

  Object.keys(query).forEach(key => {
    filter[key] = query[key];
  });

  return filter;
}

const Browse: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const location = useLocation();
  const nav = useNavigate();

  const search   = useSelector((state: CombinedStore) => state.browse.search);
  const courses  = useSelector((state: CombinedStore) => state.browse.filters.courses);
  const cuisines = useSelector((state: CombinedStore) => state.browse.filters.cuisines);
  const ratings  = useSelector((state: CombinedStore) => state.browse.filters.ratings);

  const locationSearch = location.search;
  const qs: Record<string, string> = queryString.parse(locationSearch) as Record<string, string>;
  const qsMergedDefaults = mergeDefaultFilters(qs) as Record<string, string>;
  const qsMergedString = queryString.stringify(qsMergedDefaults);

  const reloadData = () => {
    window.scrollTo(0, 0);
    if (search.items?.get(qsMergedString) == null) {
      dispatch(SearchActions.loadRecipes(qsMergedDefaults));
      dispatch(FilterActions.loadCourses(qsMergedDefaults));
      dispatch(FilterActions.loadCuisines(qsMergedDefaults));
      dispatch(FilterActions.loadRatings(qsMergedDefaults));
    } else {
      if (courses.items?.get(qsMergedString) == null) {
        dispatch(FilterActions.loadCourses(qsMergedDefaults));
      }
      if (cuisines.items?.get(qsMergedString) == null) {
        dispatch(FilterActions.loadCuisines(qsMergedDefaults));
      }
      if (ratings.items?.get(qsMergedString) == null) {
        dispatch(FilterActions.loadRatings(qsMergedDefaults));
      }
    }
  };

  useEffect(() => {
    reloadData();
  }, [locationSearch]);

  const buildUrl = (name: string, value: string, multiSelect = false) => {
    if (!name) return '/browser';

    const qsBuilder = _.cloneDeep(qs);

    delete qsBuilder.offset;

    if (value !== '') {
      if (qsBuilder[name] && multiSelect) {
        const query = qsBuilder[name].split(',');
        if (query.includes(value.toString())) {
          if (query.length === 1) {
            delete qsBuilder[name];
          } else {
            let str = '';
            // eslint-disable-next-line
            query.map(val => { val != value ? str += val + ',' : ''});
            qsBuilder[name] = str.substring(0, str.length - 1);
          }
        } else {
          qsBuilder[name] = `${qsBuilder[name]},${value}`;
        }
      } else {
        qsBuilder[name] = value;
      }
    } else {
      delete qsBuilder[name];
    }

    const str = queryString.stringify(qsBuilder);
    return str ? `/browser?${str}` : '/browser';
  };

  const doSearch = (value: string) => {
    const qsBuilder = _.cloneDeep(qs);

    delete qsBuilder.offset;
    if (value !== '') {
      qsBuilder.search = value;
    } else {
      delete qsBuilder.search;
    }

    let str = queryString.stringify(qsBuilder);
    str = str ? `/browser?${str}` : '/browser';
    nav(str);
  };

  const handleOpenRecipe = (rec: RecipeList) => {
    dispatch(RecipeActions.preload(rec));
  };

  return (
    <PageWrapper title={intl.messages['nav.recipes'] as string}>
      <Search
          qs = {qs}
          qsString = {qsMergedString}
          defaultFilters = {DefaultFilters}
          buildUrl = {buildUrl}
          doSearch = {doSearch}
          onOpenRecipe = {handleOpenRecipe}

          search   = {search}
          courses  = {courses}
          cuisines = {cuisines}
          ratings  = {ratings} />
    </PageWrapper>
  );
};

export default Browse;
