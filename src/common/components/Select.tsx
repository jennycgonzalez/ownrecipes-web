import classNames from 'classnames';
import { createRef } from 'react';
import { Form } from 'react-bootstrap';
import SelectReact, { SingleValue } from 'react-select';
import CreatableSelectReact from 'react-select/creatable';
// import AsyncReact from 'react-select/async';

import '../css/select.css';

import BaseComponent, { IBaseComponentProps } from './BaseComponent';
import ConditionalWrapper from './ConditionalWrapper';
import Tooltip from './Tooltip';

/*
export class Async extends BaseComponent {
  handleChange(data) {
    this.setState({
      value: data,
    });

    if (this.props.change) {
      this.props.change(this.props.name, data ? data.value : '');
      this.props.change(this.props.title, data ? data.label : '');
    }
  }

  render() {
    return (
      <div className={this.props.class} key={this.props.id}>
        <div className={`form-group ${this.hasErrors() ? 'has-error' : null}`}>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <AsyncReact
              name = {this.props.name}
              value = {this.props.value}
              onChange = {this.handleChange}
              loadOptions = {this.props.loadOptions}
          />
          { this.getErrorMessage() }
        </div>
      </div>
    );
  }
}
*/

export type SelectDataType = { value: string, label: string };

interface ISelectProps extends IBaseComponentProps {
  value?: string;
  data?:  Array<SelectDataType>;

  onChange?: (name: string, newValue: string | undefined) => void;
}

// eslint-disable-next-line import/prefer-default-export
export class Select extends BaseComponent<ISelectProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  handleChange = (data: SingleValue<SelectDataType>) => {
    this.setState({
      value: data,
    });

    if (this.props.onChange) {
      this.props.onChange(this.props.name, data?.value);
    }
  };

  render() {
    const selectedOption = this.props.data?.find(o => o.value === this.props.value);
    return (
      <Form.Group
          controlId = {this.props.name}
          className = {classNames('form-group', this.props.className, {
            error:    this.hasError(),
            readonly: this.props.readOnly,
            required: this.props.required && !this.props.readOnly,
          })}>
        <ConditionalWrapper
            condition = {this.props.tooltip != null}
            render    = {childr => <Tooltip id={`${this.props.name}-tooltip`} tooltip={this.props.tooltip}>{childr}</Tooltip>}>
          {this.getLabel({ htmlFor: `${this.props.name}-input` })}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <SelectReact
              name     = {this.props.name}
              value    = {selectedOption}
              options  = {this.props.data}
              onChange = {this.handleChange}
              placeholder = ''
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}

export interface ICreatableSelectValues extends IBaseComponentProps {
  value?: string;
  data?:  Array<SelectDataType>;
}
interface ICreatableSelectProps extends ICreatableSelectValues {
  onChange?: (name: string, newValue: string | undefined) => void;
}

interface ICreatableSelectState {
  options: Array<SelectDataType>;
}

const isValidNewOption = (value: string): boolean => !!value;

export class CreatableSelect extends BaseComponent<ICreatableSelectProps, ICreatableSelectState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  constructor(props: ICreatableSelectProps) {
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

  handleChange = (data: SingleValue<SelectDataType>) => {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, data?.value);
    }
  };

  handleCreate = (inputValue: string) => {
    const { options } = this.state;
    const newOption: SelectDataType = { value: inputValue, label: inputValue };
    this.setState(
      {
        options: [...options, newOption],
      },
      () => {
        this.handleChange(newOption);
      }
    );
  };

  render() {
    const dataOptions = this.props.data ?? [];
    const options = dataOptions.concat(this.state.options);
    const selectedOption = options.find(o => o.value === this.props.value) ?? '' as unknown as SelectDataType;

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
          {this.getHelpText()}
          {this.getErrorMessage()}
          <CreatableSelectReact
              inputId = {`${this.props.name}-input`}
              onChange = {this.handleChange}
              isValidNewOption = {isValidNewOption}
              onCreateOption = {this.handleCreate}
              isClearable
              value = {selectedOption}
              className = 'react-select-container'
              classNamePrefix = 'creatable-select'
              options = {options}
              placeholder = ''
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
