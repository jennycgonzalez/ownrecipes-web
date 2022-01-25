import { Component } from 'react';

export default class BaseModal extends Component {
  validate = (name, value) => {
    const v = this.props.validation.find(t => t.name === name);
    if (v) {
      v.validators.map(t => {
        const error = t(value);
        if (error) {
          const newState = {};
          const key = `error_${name}`;
          newState[key] = error;
          this.setState(this.setState(newState));
        }
        return t;
      });
    }
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  change = (name, value) => {
    this.validate(name, value);
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  remove = message => {
    if (window.confirm(message)) {
      this.props.onRemove(this.props.id);
      this.props.onHide();
    }
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  save = e => {
    e.preventDefault();
    this.props.onSave(this.props.id, this.state);
    this.props.onHide();
  };
}
