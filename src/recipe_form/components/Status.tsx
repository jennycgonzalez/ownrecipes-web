import { useEffect, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Toast from '../../common/components/Toast';
import GenericReducerType, { PendingState } from '../../common/store/GenericReducerType';

export interface IStatusProps {
  queryState: GenericReducerType;
}

const Status: React.FC<IStatusProps> = ({ queryState }: IStatusProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    save_success: {
      id: 'status.save_success',
      description: 'Toast for successfully saved form.',
      defaultMessage: 'Changes saved.',
    },
  });

  const prevPending = useRef<PendingState>();

  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  const { pending } = queryState;

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
