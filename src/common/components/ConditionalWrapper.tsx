interface IConditionalWrapperProps {
  condition: boolean;
  render: (children: any) => React.ReactElement; // eslint-disable-line @typescript-eslint/no-explicit-any
  children: React.ReactNode;
}

const ConditionalWrapper: React.FC<IConditionalWrapperProps> = ({ condition, render, children }: IConditionalWrapperProps) => {
  if (children == null) return null;
  return condition ? render(children) : <>{children}</>; // eslint-disable-line react/jsx-no-useless-fragment
};

export default ConditionalWrapper;
