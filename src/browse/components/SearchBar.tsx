import React from 'react';
import { Button } from 'react-bootstrap';
import { DebounceInput } from 'react-debounce-input';
import { injectIntl, defineMessages, WrappedComponentProps } from 'react-intl';
import Icon from '../../common/components/Icon';

export interface ISearchBarProps extends WrappedComponentProps {
  value:  string;
  count:  number;
  doSearch: (value: string) => void;
}

interface ISearchBarState {
  value: string;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);

    this.state = {
      value: this.props.value ?? '',
    };
  }

  handleClearInput = () => {
    this.setState({ value: '' }, this.handleFilter);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>)  =>  {
    this.setState({ value: event.target.value }, this.handleFilter);
  };

  handleFilter = () => {
    if (this.props.doSearch) {
      this.props.doSearch(this.state.value);
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps: ISearchBarProps) {
    if (!nextProps.value) {
      this.setState({ value: '' });
    } else if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  shouldComponentUpdate(nextProps: ISearchBarProps) {
    return this.props.value !== nextProps.value || this.props.count !== nextProps.count;
  }

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      search: {
        id: 'searchbar.label',
        description: 'SearchBar label',
        defaultMessage: 'Search for Recipes',
      },
      search_mobile: {
        id: 'searchbar.mobile.label',
        description: 'SearchBar mobile label',
        defaultMessage: 'Search',
      },
      recipes: {
        id: 'filter.recipes',
        description: 'recipes',
        defaultMessage: 'recipes',
      },
      input_placeholder: {
        id: 'searchbar.placeholder',
        description: 'SearchBar input placeholder',
        defaultMessage: 'Enter a title, tag, or ingredient',
      },
    });

    let clearInput;
    if (this.state.value) {
      clearInput = (
        <Button className='input-group-addon search-clear' onClick={this.handleClearInput}>
          <Icon icon='x-square' variant='light' />
        </Button>
      );
    }

    return (
      <div>
        <div className='input-group search-bar'>
          <span className='input-group-addon' id='search_bar_label'>
            <span className='hidden-xs'>
              {formatMessage(messages.search)}
              :
            </span>
            <span className='visible-xs'>
              {formatMessage(messages.search_mobile)}
              :
            </span>
          </span>
          <DebounceInput
              name='SearchBar'
              minLength={2}
              debounceTimeout={250}
              aria-describedby='search_bar_label'
              className='form-control'
              placeholder={formatMessage(messages.input_placeholder)}
              value={this.state.value}
              onChange={this.handleChange} />
          {clearInput}
          <span className='input-group-addon hidden-xs'>
            {this.props.count}
            {' '}
            {formatMessage(messages.recipes)}
          </span>
        </div>
      </div>
    );
  }
}

export default injectIntl(SearchBar);
