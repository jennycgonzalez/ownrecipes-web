import classNames from 'classnames';
import { createRef } from 'react';
import { Form } from 'react-bootstrap';
import { GroupBase, OptionsOrGroups } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import '../../common/css/select.css';

import BaseComponent, { IBaseComponentProps } from '../../common/components/BaseComponent';
import { SelectDataType } from '../../common/components/Select';
import ConditionalWrapper from '../../common/components/ConditionalWrapper';
import Tooltip from '../../common/components/Tooltip';

interface IRecipeGroupSelectProps extends IBaseComponentProps {
  value?: SelectDataType;
  data?:  OptionsOrGroups<SelectDataType, GroupBase<SelectDataType>> | undefined;

  size?: string;

  change?: (name: string, newValue: SelectDataType) => void;
}

interface IRecipeGroupSelectState {
  options: OptionsOrGroups<SelectDataType, GroupBase<SelectDataType>>;
}

export default class RecipeGroupSelect extends BaseComponent<IRecipeGroupSelectProps, IRecipeGroupSelectState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  constructor(props: IRecipeGroupSelectProps) {
    super(props);

    this.state = {
      options: [],
    };
  }

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  handleChange(data: SelectDataType) {
    if (typeof data !== 'object') { return; }
    if (data instanceof Array) { return; }

    if (this.props.change) {
      this.props.change(this.props.name, data ? data.value : '');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isValidNewOption = (value: SelectDataType) => !!value;

  handleCreate = (inputValue: SelectDataType) => {
    const { options } = this.state;
    const newOption = { value: { title: inputValue }, label: inputValue };
    this.setState(
      {
        options: [...options, newOption],
      },
      () => {
        if (this.props.change) {
          this.props.change(this.props.name, newOption.value);
        }
      }
    );
  };

  render() {
    return (
      <Form.Group
          className = {classNames('form-group', this.props.className, {
            error:    this.hasError(),
            readonly: this.props.readOnly,
            required: this.props.required && !this.props.readOnly,
          })}>
        <ConditionalWrapper
            condition = {this.props.tooltip != null}
            render    = {childr => <Tooltip id={`${this.props.name}-tooltip`} tooltip={this.props.tooltip}>{childr}</Tooltip>}>
          {this.getLabel({ htmlFor: `${this.props.name}-input` })}
          {this.getErrorMessage()}
          <CreatableSelect
              inputId = {`${this.props.name}-input`}
              onChange = {this.handleChange}
              isValidNewOption = {this.isValidNewOption}
              onCreateOption = {this.handleCreate}
              value = {{ value: this.props.value, label: this.props.value.title }}
              className = 'react-select-container'
              classNamePrefix = 'creatable-select'
              options = {this.props.data?.map(x => ({ value: x, label: x.title })).concat(this.state.options)} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
