import classNames from 'classnames';

import '../css/p.css';

export interface IPProps {
  variant?: 'body1' | 'body2';
  className?: string;
  children: React.ReactNode;
}

const P: React.FC<IPProps> = ({ variant, className, children }: IPProps) => (
  <p className={classNames(variant ?? 'body1', className)}>{children}</p>
);

export default P;
