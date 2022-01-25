const bindActionCreator = (actionCreator, index) =>
  (...args) => actionCreator(...args, index);

const bindIndexToActionCreators = (actionCreators, index) => {
  const transformed = {};
  Object.keys(actionCreators).forEach(key => {
    transformed[key] = bindActionCreator(actionCreators[key], index)
  });
  return transformed;
};

export default bindIndexToActionCreators
