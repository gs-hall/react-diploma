import { useSelector } from 'react-redux';
import { selectCountInCart } from '../features/cart/cartSlice';
import useGetCart from './useGetCart';

export default function useGetCartCount() {
  useGetCart();
  return useSelector(selectCountInCart);
};