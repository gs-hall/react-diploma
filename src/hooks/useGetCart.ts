import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData, localStorageCartKey, selectCartDataAsArray } from '../features/cart/cartSlice';

export default function useGetCart() {
  const data = useSelector(selectCartDataAsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data == null) {
      const dataFromLocalStorage = JSON.parse(localStorage.getItem(localStorageCartKey) || '{}');
      console.log('useGetCart loaded data from LS =', dataFromLocalStorage);
      if (dataFromLocalStorage) {
        dispatch(setCartData(dataFromLocalStorage));
      };
    };
  }, [data, dispatch]);

  return data;
};