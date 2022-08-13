import classNames from 'classnames';

import '../css/width_height_ratio.css';

export interface IWidthHeightRatioProps {
  height: number;
  width:  number;

  className?: string;
  children: React.ReactNode;
}

const WidthHeightRatio: React.FC<IWidthHeightRatioProps> = ({
  height, width, className, children }: IWidthHeightRatioProps) => (
    <div
        style = {{
          paddingTop: `${height}%`,
          width:      `${width}%`,
          position:   'relative',
        }}
        className={classNames('width-height-ratio', className)}>
      {children}
    </div>
);

export default WidthHeightRatio;
