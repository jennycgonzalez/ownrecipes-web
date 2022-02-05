import { Alert as BootstrapAlert } from 'react-bootstrap';

import '../css/alert.css';
import Icon from './Icon';

export interface IAlertProps {
  severity: 'danger' | 'info';
  title: string;
  className?: string;

  children: React.ReactNode;
}

const Alert: React.FC<IAlertProps> = (props: IAlertProps) => (
  <BootstrapAlert variant={props.severity}>
    <BootstrapAlert.Heading>
      {props.severity === 'info'   && <Icon icon='info-circle' size='2x' className='alert-icon' />}
      {props.severity === 'danger' && <Icon icon='exclamation-diamond' size='2x' className='alert-icon' />}
      {props.title}
    </BootstrapAlert.Heading>
    {typeof props.children === 'string' && (
      <p className='alert-message mb-0'>{props.children}</p>
    )}
    {typeof props.children !== 'string' && (
      <div className='alert-message'>{props.children}</div>
    )}
  </BootstrapAlert>
);

export default Alert;
