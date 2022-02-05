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
    <p className='mb-0'>{props.children}</p>
  </BootstrapAlert>
);

export default Alert;
