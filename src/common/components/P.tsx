import classNames from 'classnames';

import '../css/p.css';

export interface IPProps {
  variant?: 'body1' | 'body2';
  className?: string;
  children: React.ReactNode;
}

const P: React.FC<IPProps> = (props: IPProps) => (
  <p className={classNames(props.variant ?? 'body1', props.className)}>{props.children}</p>
);

export default P;
