import { Component } from 'react';

import { Input } from '../../common/components/FormComponents';

class TagList extends Component {
  unarrayify = value => value.map(tag => tag.title).join(', ');

  arrayify = value => {
    const dict = [];
    if (value) {
      const tags = value.split(',');
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const title in tags) {
        dict.push({ title: tags[title].trim() });
      }
    }
    return dict;
  };

  handleChange = (name, value) => {
    if (this.props.change) {
      this.props.change(name, this.arrayify(value));
    }
  };

  render() {
    return (
      <Input
          name={this.props.name}
          label={this.props.label}
          placeholder={this.props.placeholder}
          size={this.props.size}
          change={this.handleChange}
          value={this.props.tags ? this.unarrayify(this.props.tags) : ''}
          errors={this.props.errors}
      />
    );
  }
}

export default TagList;
