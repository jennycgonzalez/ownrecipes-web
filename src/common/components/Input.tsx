import { Form, InputGroup } from 'react-bootstrap';
import { BaseComponent, IBaseComponentProps } from './FormComponents';

import '../css/input.css';
import classNames from 'classnames';

interface IInputProps extends IBaseComponentProps {
  label?: string;

  placeholder?: string;
  autoComplete?: string;

  inputAdornmentStart?: React.ReactNode;

  size?: string;

  change?: (name: string, newValue: string) => void;
}

type ITextInputProps = {
  type?:  'text' | 'password';
  rows?:  number;

  value?: string;

  change?: (name: string, newValue: string) => void;
} & IBaseComponentProps & IInputProps;

type INumberInputProps = {
  type?:  'number';

  placeholder?: string;
  autoComplete?: string;

  inputAdornmentStart?: React.ReactNode;

  value?: string;
  min?:   number;
  max?:   number;

  change?: (name: string, newValue: string) => void;
} & IBaseComponentProps & IInputProps;

type IAnyInputProps = ITextInputProps | INumberInputProps;
export const isTextInput = (inp: IAnyInputProps): inp is ITextInputProps => (inp as ITextInputProps).type == null || (inp as ITextInputProps).type === 'text' || (inp as ITextInputProps).type === 'password';
export const isNumberInput = (inp: IAnyInputProps): inp is INumberInputProps => (inp as INumberInputProps).type === 'number';

export default class Input extends BaseComponent<IAnyInputProps> {
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
              as    = {isTextInput(this.props) && type === 'text' && this.props.rows != null ? 'textarea' : undefined}
              value = {this.props.value}
              rows  = {isTextInput(this.props) && type === 'text' ? this.props.rows : undefined}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              min   = {isNumberInput(this.props) ? this.props.min : undefined}
              max   = {isNumberInput(this.props) ? this.props.max : undefined}

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
