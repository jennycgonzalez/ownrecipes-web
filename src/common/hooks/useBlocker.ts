import { History, Transition } from 'history';
import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

type ExtendNavigator = Navigator & Pick<History, 'block'>;

export function useBlocker(blocker: (tx: Transition) => void, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = (navigator as unknown as ExtendNavigator).block(tx => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    // eslint-disable-next-line consistent-return
    return unblock;
  }, [navigator, blocker, when]);
}

export default function usePrompt(message: string, when = true) {
  const blocker = useCallback((tx: Transition) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(message)) tx.retry();
  }, [message]);

  useBlocker(blocker, when);
}
