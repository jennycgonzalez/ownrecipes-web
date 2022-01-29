import Alert from '../../common/components/Alert';
import '../css/demo.css';

const Demo = () => (
  <div className='list-error demo-no-margin'>
    <Alert severity='info' className='demo-no-margin' title='DEMO NOTICE'>
      Everything is Read-Only! This is a demo version of the OwnRecipes and has no API connected to it.
    </Alert>
  </div>
);

export default Demo;
