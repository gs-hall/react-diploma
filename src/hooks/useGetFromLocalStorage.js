import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useGetFromLocalStorage(selector, setDataAction, localStorageKey) {
  console.log('useGetFromLocalStorage selector = ', selector,' setDataAction =', setDataAction, 'localStorageKey = ', localStorageKey);
  const data = useSelector(selector);
  const dispatch = useDispatch();
  console.log('useGetFromLocalStorage data from memory =', data);

  useEffect(() => {
    if (data == null) {
      console.log('useGetFromLocalStorage loading data from local storage =', localStorageKey);
      const dataFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
      console.log('useGetFromLocalStorage loaded data =', dataFromLocalStorage);
      if (dataFromLocalStorage) {
        dispatch(setDataAction(dataFromLocalStorage));
      };
    };

  }, [data, localStorageKey, dispatch, setDataAction]);

  return data;
};