import { Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import P from '../../common/components/P';
import { SearchResult } from '../../browse/store/SearchTypes';
import SearchMenu from './SearchMenu';
import { Course, Cuisine } from '../../recipe/store/RecipeTypes';

export interface IRandomHeaderProps {
  search:   Record<string, SearchResult> | undefined;
  courses:  Array<Course>| undefined;
  cuisines: Array<Cuisine> | undefined;
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const RandomHeader: React.FC<IRandomHeaderProps> = ({
    search, courses, cuisines, qs, qsString,
    buildUrl }: IRandomHeaderProps) => {
  const intl = useIntl();

  const { formatMessage } = intl;
  const messages = defineMessages({
    random_heading: {
      id: 'random.heading',
      description: 'Heading of the random page.',
      defaultMessage: 'Random recipe',
    },
    random_text: {
      id: 'random.heading.text',
      description: 'Some nice text above the random search results.',
      defaultMessage: 'Looking for an awesome meal? There are plenty waiting for you!',
    },
  });

  const qsSearchResult = search?.[qsString];

  return (
    <Row xs={1} sm={2} className='random-header-container'>
      <div>
        <h2>{formatMessage(messages.random_heading)}</h2>
        <P>{formatMessage(messages.random_text)}</P>
      </div>
      <SearchMenu
          qs       = {qs}
          search   = {qsSearchResult}
          courses  = {courses}
          cuisines = {cuisines}
          buildUrl = {buildUrl}
          />
    </Row>
  );
};

export default RandomHeader;
