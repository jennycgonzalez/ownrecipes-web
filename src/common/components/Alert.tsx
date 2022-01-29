import { Alert as BootstrapAlert } from 'react-bootstrap';

export interface IAlertProps {
  severity: 'danger' | 'info';
  title: string;
  className?: string;

  children: React.ReactNode;
}

const Alert: React.FC<IAlertProps> = (props: IAlertProps) => (
  <BootstrapAlert variant={props.severity}>
    <BootstrapAlert.Heading>{props.title}</BootstrapAlert.Heading>
    <p>{props.children}</p>
  </BootstrapAlert>
);

export default Alert;
