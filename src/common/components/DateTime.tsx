import Datetime from 'react-datetime';
import moment from 'moment';
import { BaseComponent, IBaseComponentProps } from './FormComponents';
import { Form } from 'react-bootstrap';

require('react-datetime/css/react-datetime.css');

interface IDateTimeProps extends IBaseComponentProps {
  name: string;
  label: string;
  timeFormat?: string;
  dateFormat?: string;
  change: (name: string, newIsoDate: string) => void;
  class: string;
}

interface IDateTimeState {
  value: moment.MomentInput,
}

export default class DateTime extends BaseComponent<IDateTimeProps, IDateTimeState> {
  handleChange(date: moment.MomentInput) {
    this.setState({
      value: date,
    });

    if (this.props.change) {
      this.props.change(this.props.name, moment(date).toISOString());
    }
  }

  render() {
    return (
      <Form.Group controlId={this.props.name} className='form-group'>
        {this.props.label && <Form.Label>{this.props.label}</Form.Label>}
        <Datetime
            value = {!this.props.timeFormat ? moment(this.state.value).format('ddd, ll') : moment(this.state.value).format('llll')}
            inputProps = {{ name: this.props.name, className: 'form-control' }}
            dateFormat ={this.props.dateFormat || 'ddd, ll'}
            timeFormat ={this.props.timeFormat}
            onChange   = {this.handleChange} />
        {this.getErrorMessage()}
      </Form.Group>
    );
  }
}
