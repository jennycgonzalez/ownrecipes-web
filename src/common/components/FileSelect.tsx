import { createRef } from 'react';
import { Form } from 'react-bootstrap';

import BaseComponent, { IBaseComponentProps } from './BaseComponent';
import ConditionalWrapper from './ConditionalWrapper';
import Tooltip from './Tooltip';

interface IFileSelectProps extends IBaseComponentProps {
  accept?: string;

  onChange?: (name: string, newValue: File | undefined) => void;
}

class FileBase extends BaseComponent<IFileSelectProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  clearValue() { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.value = '';
    }
  }

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.name, event?.target.files?.[0]);
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
          {this.getHelpText()}
          {this.getErrorMessage()}
          <Form.Control
              type   = 'file'
              name   = {this.props.name}
              accept = {this.props.accept}
              readOnly = {this.props.readOnly}
              disabled = {this.props.disabled}
              onChange = {this.handleChange}
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}

const FileSelect = FileBase;
export default FileSelect;
