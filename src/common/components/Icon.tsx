export interface IIconProps {
  icon: string;
  variant?: 'filled' | 'light';
}

function toVariantAffix(variant?: 'filled' | 'light'): string {
  if (variant == null || variant === 'filled') {
    return '-fill';
  } else {
    return '';
  }
}

const Icon: React.FC<IIconProps> = (props: IIconProps) => (
  <i className={`bi bi-${props.icon}${toVariantAffix(props.variant)}`} />
);

export default Icon;
