import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, localStorageCartKey, selectCartDataAsArray } from '../features/cart/cartSlice';

export default function useGetCart() {
  const data = useSelector(selectCartDataAsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data == null) {
      const json = localStorage.getItem(localStorageCartKey);
      if (json) {
        const dataFromLocalStorage = JSON.parse(json);
        console.log('useGetCart loaded data from LS =', dataFromLocalStorage);
        if (dataFromLocalStorage) {
          dispatch(setCart(dataFromLocalStorage));
        };
      };
    };
  }, [data, dispatch]);

  return data;
};