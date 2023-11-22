import { useEffect } from 'react';

export const usePreset = (preset, callback) => {
  useEffect(() => {
    console.log('usePreset', preset)
    callback(preset)
  }, [preset, callback])
};

export default usePreset
