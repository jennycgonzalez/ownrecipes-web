import Tabs from './Tabs';
import Status from '../containers/Status';

import '../css/menu.css';

const MenuLayout = props => (
  <div className='container menu-planner'>
    <div className='row'>
      <div className='col-xs-12'>
        <Status />
      </div>
    </div>
    <div className='row'>
      <div className='col-sm-12 col-md-2'>
        <Tabs
            activeTab={props.tab}
            changeTab={props.changeTab}
            onMenuItemShow={props.onMenuItemShow} />
      </div>
      <div className='col-sm-12 col-md-10 content'>
        {props.children}
      </div>
    </div>
  </div>
);

export default MenuLayout;
