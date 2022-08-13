import { useEffect } from 'react';

export default function useSingle(getFunction: () => void, obj: unknown) {
  useEffect(() => {
    if (obj == null) {
      getFunction();
    }
  }, [getFunction, obj]);
}
