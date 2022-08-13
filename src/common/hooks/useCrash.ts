import { useCallback, useState } from 'react';

export default function useCrash() {
  const [, setState] = useState();
  return (
    useCallback((err: Error | unknown | string) => {
      const errr: Error | unknown = (typeof err === 'string') ? new Error(err) : err;
      setState(() => { throw errr; });
      throw errr;
    }, [])
  );
}
