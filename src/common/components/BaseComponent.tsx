import { Component } from 'react';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';

import '../css/button.css';
import '../css/form_group.css';

import Icon from './Icon';

export interface IBaseComponentProps {
  name:       string;
  label?:     string;

  autoFocus?: boolean;
  required?:  boolean;
  readOnly?:  boolean;
  disabled?:  boolean;

  autoComplete?: string;
  helpText?:  React.ReactNode;
  tooltip?:   React.ReactNode;
  errors?:    React.ReactNode;

  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  change?: (name: string, newValue: any) => void;
}

export type BaseLabelProps = {
  htmlFor?: string;
}

export default class BaseComponent<P extends IBaseComponentProps, S = {}> extends Component<P, S> {
  constructor(props: P) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange(event: any) {
    if (this.props.readOnly || this.props.disabled) return;
    if (this.props.change) {
      this.props.change(this.props.name, event.target.value);
    }
  }

  hasError(): boolean {
    return !!this.props.errors;
  }

  getErrorMessage() { // eslint-disable-line react/no-unused-class-component-methods
    return this.hasError() ? <Form.Text className='error-text'>{this.props.errors}</Form.Text> : null;
  }

  getHelpText() { // eslint-disable-line react/no-unused-class-component-methods
    return this.props.helpText ? <Form.Text className='help-text'>{this.props.helpText}</Form.Text> : null;
  }

  getLabel(labelProps?: BaseLabelProps): React.ReactNode | undefined { // eslint-disable-line react/no-unused-class-component-methods
    if (this.props.label == null) {
      return null;
    } else if (this.props.tooltip) {
      return (
        <>
          <Form.Label htmlFor={labelProps?.htmlFor}>{this.props.label}</Form.Label>
          &nbsp;
          <Icon icon='info-circle' className='tooltip-icon' />
        </>
      );
    } else {
      return <Form.Label htmlFor={labelProps?.htmlFor}>{this.props.label}</Form.Label>;
    }
  }

  getFormGroupClassNames() { // eslint-disable-line react/no-unused-class-component-methods
    return classNames('form-group', this.props.className, {
      error:    this.hasError(),
      readonly: this.props.readOnly,
      required: this.props.required && !this.props.readOnly,
      'no-label': this.props.label == null,
    });
  }
}
