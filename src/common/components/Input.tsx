import { Form, InputGroup } from 'react-bootstrap';
import { BaseComponent, IBaseComponentProps } from './FormComponents';

import '../css/input.css';

interface IInputProps extends IBaseComponentProps {
  label?: string;
  type?: 'text' | 'password' | 'number';
  rows?:  number;

  placeholder?: string;
  autoComplete?: string;

  inputAdornmentStart?: React.ReactNode;

  value?: string | number;

  size?: string;

  change: (name: string, newValue: string) => void;
}

export default class Input extends BaseComponent<IInputProps> {
  render() {
    const type = this.props.type ?? 'text';
    return (
      <Form.Group controlId={this.props.name} className='form-group'>
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

              autoComplete = {this.props.autoComplete}
              placeholder  = {this.props.placeholder}

              onChange={this.handleChange}
              autoFocus = {this.props.autoFocus}
              required  = {this.props.required} />
        </InputGroup>
      </Form.Group>
    );
  }
}
