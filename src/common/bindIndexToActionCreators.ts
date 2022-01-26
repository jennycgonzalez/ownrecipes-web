const bindActionCreator = (actionCreator: any, index: number) => (...args: any[]) => actionCreator(...args, index);

const bindIndexToActionCreators = (actionCreators: any, index: number) => {
  const transformed: Record<string, any> = {};
  Object.keys(actionCreators).forEach((key: string) => {
    transformed[key] = bindActionCreator(actionCreators[key], index);
  });
  return transformed;
};

export default bindIndexToActionCreators;
