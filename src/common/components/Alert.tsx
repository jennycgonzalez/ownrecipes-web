import classNames from 'classnames';

export interface IAlertProps {
  severity: 'danger';
  title: string;
  message: React.ReactNode;
}

const Alert: React.FC<IAlertProps> = (props: IAlertProps) => (
  <div className={classNames('alert', `alert-${props.severity}`)}>
    <p><strong>{props.title}</strong></p>
    {props.message}
  </div>
);

export default Alert;
