import { useEffect, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { CombinedStore } from '../../app/Store';

import Toast from '../../common/components/Toast';
import { PendingState } from '../../common/store/GenericReducerType';

const Status: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    save_success: {
      id: 'status.save_success',
      description: 'Toast for successfully saved form.',
      defaultMessage: 'Changes saved.',
    },
  });

  const pending = useSelector((state: CombinedStore) => state.recipeForm.pending);
  const prevPending = useRef<PendingState>();
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (prevPending.current === PendingState.SAVING && pending === PendingState.COMPLETED) {
      setShowSaveSuccess(true);
    }

    prevPending.current = pending;
  }, [pending]);

  const handleCloseSaveSuccessToast = () => {
    setShowSaveSuccess(false);
  };

  return (
    <Toast
        show = {showSaveSuccess}
        variant = 'success'
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose = {handleCloseSaveSuccessToast}>
      {formatMessage(messages.save_success)}
    </Toast>
  );
};

export default Status;
