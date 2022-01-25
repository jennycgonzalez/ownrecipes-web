const Status = props => {
  if (props.status.message.length > 1) {
    let cssClass = 'alert alert-info alert-dismissible';
    if (props.status.alert) {
      cssClass = `alert alert-dismissible ${props.status.alert}`;
    }
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className={cssClass} role='alert'>
            <button type='button' className='close' data-dismiss='alert' onClick={props.actions.close}>
              <span>&times;</span>
            </button>
            { props.status.message }
          </div>
        </div>
      </div>
    );
  }
  return (
    <span />
  );
};

export default Status;
