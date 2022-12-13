import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData, localStorageCartKey, selectCountInCart } from '../features/cart/cartSlice';

export default function useGetCartCount() {
  const count = useSelector(selectCountInCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (count == null) {
      const dataFromLocalStorage = JSON.parse(localStorage.getItem(localStorageCartKey) || '{}');
      console.log('useGetCartCount loaded data from LS =', dataFromLocalStorage);
      if (dataFromLocalStorage) {
        dispatch(setCartData(dataFromLocalStorage));
      };
    };
  }, [count, dispatch]);

  return count;
};