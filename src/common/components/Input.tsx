import { Form, InputGroup } from 'react-bootstrap';
import { BaseComponent, IBaseComponentProps } from './FormComponents';

import '../css/input.css';
import classNames from 'classnames';

interface IInputProps extends IBaseComponentProps {
  label?: string;
  type?: 'text' | 'password' | 'number';
  rows?:  number;

  placeholder?: string;
  autoComplete?: string;

  inputAdornmentStart?: React.ReactNode;

  value?: string | number;

  size?: string;

  change?: (name: string, newValue: string) => void;
}

export default class Input extends BaseComponent<IInputProps> {
  render() {
    const type = this.props.type ?? 'text';
    return (
      <Form.Group
          controlId = {this.props.name}
          className = {classNames('form-group', {
            readonly: this.props.readOnly,
            required: this.props.required && !this.props.readOnly,
          })}>
        {this.props.label && <Form.Label>{this.props.label}</Form.Label>}
        {this.getErrorMessage()}
        <InputGroup>
          {this.props.inputAdornmentStart && <InputGroup.Text>{this.props.inputAdornmentStart}</InputGroup.Text>}
          <Form.Control
              name  = {this.props.name}
              type  = {type}
              as    = {type === 'text' && this.props.rows != null ? 'textarea' : undefined}
              value = {this.props.value}
              rows  = {type === 'text' && this.props.rows != null ? this.props.rows : undefined}

              required  = {this.props.required}
              readOnly  = {this.props.readOnly}
              autoComplete = {this.props.autoComplete}
              placeholder  = {this.props.placeholder}
              autoFocus = {this.props.autoFocus}

              onChange={this.handleChange}
               />
        </InputGroup>
      </Form.Group>
    );
  }
}
