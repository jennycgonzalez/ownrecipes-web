import { useCallback } from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';

import useCrash from './useCrash';

export default function useDispatch() {
  const dispatch = useReduxDispatch();
  const crash = useCrash();

  return useCallback(disp => {
    try {
      return dispatch(disp);
    } catch (err) {
      crash(err as Error);
      return null;
    }
  }, []);
}
