import Spinner from 'react-spinkit';

interface ILoadingProps {
  message: string;
}

const Loading = ({ message }: ILoadingProps) => (
  <div className='spinner'>
    <h3 className='no-results'>{ message }</h3>
    <Spinner className='spinner-obj' name='circle' fadeIn='none' />
  </div>
);

export default Loading;
