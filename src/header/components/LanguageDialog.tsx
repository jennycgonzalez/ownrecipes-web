import { defineMessages, useIntl } from 'react-intl';
import { ListGroup } from 'react-bootstrap';
import Modal from '../../common/components/Modal';
import { LanguageCode, Settings } from '../../account/store/settings/types';
import { toLanguageName } from '../../app/components/IntlProvider';

export interface ILanguageDialogProps {
  show:     boolean;
  settings: Settings;
  onChangeLanguage: (language: LanguageCode) => void;
  onClose:  () => void;
}

export const LanguageDialog: React.FC<ILanguageDialogProps> = ({
    show, settings, onChangeLanguage, onClose }: ILanguageDialogProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    language_modal_title: {
      id: 'nav.accountmenu.language_modal_title',
      description: 'Change language dialog title',
      defaultMessage: 'Choose language',
    },
  });

  const handleCloseClick = () => onClose();
  const handleChangeLanguage = (lang: LanguageCode) => {
    onChangeLanguage(lang);
    onClose();
  };

  const languageButtons = Object.values(LanguageCode).map(l => (
    <ListGroup.Item key={l} action disabled={settings.language === l} onClick={() => handleChangeLanguage(l)}>{toLanguageName(l)}</ListGroup.Item>
  ));

  return (
    <Modal
        show = {show}
        title = {formatMessage(messages.language_modal_title)}
        onClose = {handleCloseClick}
        size = 'sm'
        noCloseButton>
      <ListGroup>
        {languageButtons}
      </ListGroup>
    </Modal>
  );
};
