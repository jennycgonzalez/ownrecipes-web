import { useState } from 'react';
import { Button, Card, Col, Container, NavLink, Row } from 'react-bootstrap';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

import '../css/footer.css';

import P from '../../common/components/P';
import Modal from '../../common/components/Modal';
import { isDemoMode, optionallyFormatMessage } from '../../common/utility';

interface IModalAboutProps {
  show: boolean;
  onClose: () => void;
}
const ModalAbout = ({ show, onClose }: IModalAboutProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    about_title: {
      id: 'footer.about.title',
      description: 'Title of the about dialog.',
      defaultMessage: 'About OwnRecipes',
    },
    about_developers: {
      id: 'footer.about.developers',
      description: 'Developers heading.',
      defaultMessage: 'Developers',
    },
    about_technical_info: {
      id: 'footer.about.technical info',
      description: 'Technical information heading.',
      defaultMessage: 'Version info',
    },
    about_technical_info_demo: {
      id: 'footer.about.technical info.demo alert',
      description: 'Info that this instance is a demo only.',
      defaultMessage: 'Demo mode.',
    },
    about_credits: {
      id: 'footer.about.credits',
      description: 'Credits heading.',
      defaultMessage: 'Credits',
    },
  });

  return (
    <Modal
        show = {show}
        title = {formatMessage(messages.about_title)}
        onClose = {onClose}
        noCloseButton
        className='modal-about'>
      <P variant='body1'>
        <FormattedMessage
            id='footer.credit'
            description='Footer credit'
            defaultMessage='Created with {link}, an open source recipe management site. You can share recipes with friends, rate recipes, manage your grocery lists, and more.'
            values={{
              link: <a href='https://github.com/ownrecipes/OwnRecipes'>OwnRecipes</a>,
            }} />
      </P>

      <hr />
      <h2>{formatMessage(messages.about_developers)}</h2>
      <Row xs={2} md={3} className='credits-people g-3'>
        <UserCard
            userName = 'Ryan Noelk'
            userUrl = 'https://github.com/RyanNoelk'
            imageSrc = 'https://avatars.githubusercontent.com/u/11916338?v=4'
            roles = {['founder_openeats']} />
        <UserCard
            userName = 'Frank "Roy" H.'
            userUrl = 'https://github.com/sepulzera'
            imageSrc = 'https://avatars.githubusercontent.com/u/43857716?v=4'
            roles = {['founder_ownrecipes', 'frontend']} />
        <UserCard
            userName = 'Sarajiko'
            userUrl = 'https://github.com/Sarajiko'
            imageSrc = 'https://avatars.githubusercontent.com/u/80350428?v=4'
            roles = {['backend']} />
      </Row>

      <hr />
      <h2>{formatMessage(messages.about_technical_info)}</h2>
      <P variant='body2'>
        <FormattedMessage
            id='footer.technical info.version'
            description='Version of OwnRecipes'
            defaultMessage='OwnRecipes: v{version}'
            values={{
              version: process.env.REACT_APP_VERSION,
            }} />
      </P>
      <P variant='body2'>
        <FormattedMessage
            id='footer.technical info.api url'
            description='Api url'
            defaultMessage='Api url: {url}'
            values={{
              url: process.env.REACT_APP_API_URL,
            }} />
      </P>
      {isDemoMode() && (
        <P variant='body2'>
          {formatMessage(messages.about_technical_info_demo)}
        </P>
      )}

      <hr />
      <h2>{formatMessage(messages.about_credits)}</h2>
      <P variant='body2'>
        <FormattedMessage
            id='footer.credit_openeats'
            description='Footer credit for OpenEats'
            defaultMessage='OwnRecipes is a fork of {link} by Ryan Noelk.'
            values={{
              link: <a href='https://github.com/open-eats/OpenEats'>OpenEats</a>,
            }} />
      </P>
      <P variant='body2'>
        <FormattedMessage
            id='footer.icon_credit'
            description='Footer icons credit'
            defaultMessage='Icons by {link} ({ccLink}).'
            values={{
              link: <a href='http://www.flaticon.com/authors/nikita-golubev' title='Nikita Golubev'>Nikita Golubev</a>,
              ccLink: <a href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons'>CC BY 3.0</a>,
            }} />
      </P>
    </Modal>
  );
};

interface IUserCardProps {
  userName: string;
  userUrl: string;
  imageSrc: string;
  roles: Array<string>;
}
const UserCard = ({ userName, userUrl, imageSrc, roles }: IUserCardProps) => {
  const intl = useIntl();
  defineMessages({
    founder_openeats: {
      id: 'footer.role.founder_openeats',
      description: 'Role description for the founder of OpenEats.',
      defaultMessage: 'Founder of OpenEats',
    },
    founder_ownrecipes: {
      id: 'footer.role.founder_ownrecipes',
      description: 'Role description for the founder of OwnRecipes.',
      defaultMessage: 'Founder of OwnRecipes',
    },
    backend: {
      id: 'footer.role.backend',
      description: 'Backend staff.',
      defaultMessage: 'Backend/api',
    },
    frontend: {
      id: 'footer.role.frontend',
      description: 'Frontend staff.',
      defaultMessage: 'Frontend',
    },
  });

  return (
    <Col>
      <Card>
        <Card.Img variant='top' src={imageSrc} />
        <Card.Body>
          <Card.Title><a href={userUrl}>{userName}</a></Card.Title>
          <Card.Text>{roles.map(role => optionallyFormatMessage(intl, 'footer.role.', role)).join(', ')}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Footer = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    about_link: {
      id: 'footer.about_link',
      description: 'Button title to open the about dialog.',
      defaultMessage: 'About OwnRecipes',
    },
    legal_link: {
      id: 'footer.legal_link',
      description: 'Link to the custom legal page.',
      defaultMessage: 'Legal',
    },
    privacy_link: {
      id: 'footer.privacy_link',
      description: 'Link to the custom privacy page.',
      defaultMessage: 'Privacy',
    },
  });

  const legalUrl = process.env.REACT_APP_LEGAL_URL;
  const privacyUrl = process.env.REACT_APP_PRIVACY_URL;

  const [openAbout, setOpenAbout] = useState<boolean>(false);

  const handleOpenAboutClick  = () => setOpenAbout(true);
  const handleCloseAbout = () => setOpenAbout(false);

  return (
    <>
      <footer className='footer print-hidden'>
        <Container>
          <div className='footer-container-inner'>
            <Button variant='link' onClick={handleOpenAboutClick}>{formatMessage(messages.about_link)}</Button>
            {legalUrl && <NavLink className='btn btn-link' href={legalUrl}>{formatMessage(messages.legal_link)}</NavLink>}
            {privacyUrl && <NavLink className='btn btn-link' href={privacyUrl}>{formatMessage(messages.privacy_link)}</NavLink>}
          </div>
        </Container>
      </footer>

      <ModalAbout show={openAbout} onClose={handleCloseAbout} />
    </>
  );
};

export default Footer;
