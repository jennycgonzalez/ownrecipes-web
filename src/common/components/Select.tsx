import { createRef } from 'react';
import { Form } from 'react-bootstrap';
import SelectReact, { GroupBase, OptionsOrGroups } from 'react-select';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectDataType = any;

interface ISelectProps extends IBaseComponentProps {
  value?: SelectDataType;
  data?:  OptionsOrGroups<SelectDataType, GroupBase<SelectDataType>> | undefined;

  onChange?: (name: string, newValue: boolean) => void;
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

  handleChange = (data: SelectDataType) => {
    this.setState({
      value: data,
    });

    if (this.props.onChange) {
      this.props.onChange(this.props.name, data.value);
    }
  };

  render() {
    return (
      <Form.Group
          controlId = {this.props.name}
          className = {this.getFormGroupClassNames()}>
        <ConditionalWrapper
            condition = {this.props.tooltip != null}
            render    = {childr => <Tooltip id={`${this.props.name}-tooltip`} tooltip={this.props.tooltip}>{childr}</Tooltip>}>
          {this.getLabel()}
          {this.getErrorMessage()}
          <SelectReact
              name     = {this.props.name}
              value    = {this.props.value}
              options  = {this.props.data}
              onChange = {this.handleChange}
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
