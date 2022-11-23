import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useFetch(selector, fetchAction, url) {
  const { data, isLoading, isError, isReloadRequired } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && isReloadRequired) {
      dispatch(fetchAction({ url }));
    };
  }, [dispatch, isLoading, fetchAction, url, isReloadRequired]);

  return { data, isLoading, isError };
};