import { Container } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import P from '../../common/components/P';

import '../css/footer.css';

const Footer = () => (
  <footer className='footer print-hidden'>
    <Container>
      <div>
        <P variant='body2' className='text-muted'>
          <FormattedMessage
              id='footer.credit'
              description='Footer credit'
              defaultMessage='Created with {link}'
              values={{
                link: <a href='https://github.com/ownrecipes/OwnRecipes'>OwnRecipes</a>,
              }} />
          &nbsp;-&nbsp;
          <FormattedMessage
              id='footer.icon_credit'
              description='Footer icons credit'
              defaultMessage='Icons by {link} ({ccLink})'
              values={{
                link: <a href='http://www.flaticon.com/authors/nikita-golubev' title='Nikita Golubev'>Nikita Golubev</a>,
                ccLink: <a href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons'>CC BY 3.0</a>,
              }} />
        </P>
      </div>
    </Container>
  </footer>
);

export default Footer;
