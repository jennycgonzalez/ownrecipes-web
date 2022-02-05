import { Component } from 'react';
// import { injectIntl, defineMessages } from 'react-intl';
import { Form } from 'react-bootstrap';

import '../css/button.css';
import '../css/checkbox.css';

export interface IBaseComponentProps {
  name:       string;

  autoFocus?: boolean;
  required?:  boolean;

  errors?:    React.ReactNode;

  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  change: (name: string, newValue: any) => void;
}

export class BaseComponent<P extends IBaseComponentProps, S = {}> extends Component<P, S> {
  constructor(props: P) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange(event: any) {
    if (this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  }

  hasErrors(): boolean {
    return !!this.props.errors;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getErrorMessage() {
    if (this.hasErrors()) {
      return (
        <Form.Text>{this.props.errors}</Form.Text>
      );
    }

    return null;
  }
}

/*

export class FileBase extends BaseComponent {
  handleChange(event) {
    this.setState({
      value: event.target.files[0],
    });

    if (this.props.change) {
      this.props.change(event.target.name, event.target.files[0]);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      help_block: {
        id: 'file_widget.help_block',
        description: 'File upload widget help message',
        defaultMessage: 'Please upload a picture of the finished recipe!',
      },
      note: {
        id: 'file_widget.note',
        description: 'Note: the photo must be smaller than 500kB',
        defaultMessage: 'Note: the photo must be smaller than 500kB',
      },
    });

    return (
      <div className={this.props.size} key={this.props.id}>
        <div className='form-group'>
          { this.props.label ? <label>{this.props.label}</label> : null }
          <input
              type='file'
              name={this.props.name}
              accept={this.props.accept}
              onChange={this.handleChange} />
          <p className='help-block'>
            { formatMessage(messages.help_block) }
            <br />
            { formatMessage(messages.note) }
          </p>
        </div>
      </div>
    );
  }
}
*/

export interface ICheckboxProps extends IBaseComponentProps {
  checked: boolean;
  label?:  string;
}

export class Checkbox extends BaseComponent<ICheckboxProps> {
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.change) {
      const checked = Boolean(event.target.value);
      this.props.change(event.target.name, checked);
    }
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name} className={this.props.label ? 'checkbox-control' : 'check-container'}>
          <input
              type='checkbox'
              name={this.props.name}
              checked={this.props.checked}
              onChange={this.handleChange} />
          <span className='checkmark' />
          {this.props.label && <div className='checklabel'>{this.props.label}</div>}
        </label>
      </div>
    );
  }
}

/*
export class SelectBase extends BaseComponent {
  render() {
    const options = this.props.data.map(option => (
      <option key={option.id} value={option.id}>{option.title}</option>
    ));

    return (
      <div className={this.props.size} key={this.props.id}>
        <div className={`form-group ${this.hasErrors() ? 'has-error' : null}`}>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <select
              name={this.props.name}
              className='form-control'
              value={this.state.value}
              onChange={this.handleChange}>
            <option key={0} value=''>{ this.props.default }</option>
            { options }
          </select>
          { this.getErrorMessage() }
        </div>
      </div>
    );
  }
}

/*
export const File = injectIntl(FileBase);
export const Select = injectIntl(SelectBase);
*/
