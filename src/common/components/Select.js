import SelectReact from 'react-select';
import AsyncReact from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import { BaseComponent } from './FormComponents';

import '../css/select.css';

export class RecipeGroupSelect extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.options = [];
  }

  handleChange(data) {
    if (typeof data !== 'object') { return; }
    if (data instanceof Array) { return; }

    this.setState({
      value: { value: data.value, label: data.value.title },
    });

    if (this.props.change) {
      this.props.change(this.props.name, data ? data.value : '');
    }
  }

  isValidNewOption = value => !!value;

  handleCreate = inputValue => {
    const { options } = this.state;
    const newOption = { value: { title: inputValue }, label: inputValue };
    this.setState(
      {
        options: [...options, newOption],
        value: newOption,
      },
      this.props.change(this.props.name, newOption ? newOption.value : '')
    );
  };

  render() {
    return (
      <div className={this.props.class} key={this.props.id}>
        <div className={`form-group ${this.hasErrors() ? 'has-error' : null}`}>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <CreatableSelect
              onChange = {this.handleChange}
              isValidNewOption = {this.isValidNewOption}
              onCreateOption = {this.handleCreate}
              value = {{ value: this.props.value, label: this.props.value.title }}
              options = {this.props.data.map(x => ({ value: x, label: x.title })).concat(this.state.options)} />
          { this.getErrorMessage() }
        </div>
      </div>
    );
  }
}

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

export class Select extends BaseComponent {
  handleChange(data) {
    this.setState({
      value: data,
    });

    if (this.props.change) {
      this.props.change(this.props.name, data.value);
    }
  }

  render() {
    return (
      <div className={this.props.class} key={this.props.id}>
        <div className={`form-group ${this.hasErrors() ? 'has-error' : null}`}>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <SelectReact
              name = {this.props.name}
              value = {this.state.value}
              onChange = {this.handleChange}
              options = {this.props.data} />
          { this.getErrorMessage() }
        </div>
      </div>
    );
  }
}
