import { Alert as BootstrapAlert } from 'react-bootstrap';

import '../css/alert.css';

import Icon from './Icon';
import P from './P';

export interface IAlertProps {
  severity: 'danger' | 'info';
  title: string;
  className?: string;

  children: React.ReactNode;
}

const Alert: React.FC<IAlertProps> = ({ severity, title, className, children }: IAlertProps) => (
  <BootstrapAlert variant={severity} className={className}>
    <BootstrapAlert.Heading>
      {severity === 'info'   && <Icon icon='info-circle' size='2x' className='alert-icon' />}
      {severity === 'danger' && <Icon icon='exclamation-diamond' size='2x' className='alert-icon' />}
      {title}
    </BootstrapAlert.Heading>
    {typeof children === 'string' && (
      <P className='alert-message mb-0'>{children}</P>
    )}
    {typeof children !== 'string' && (
      <div className='alert-message'>{children}</div>
    )}
  </BootstrapAlert>
);

export default Alert;
