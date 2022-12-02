import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useFetch(selector, loadAction, itemID) {
  const { data, isLoading, isError, isReloadRequired, params, ...rest } = useSelector(selector);
  const dispatch = useDispatch();
  //console.log('useFetch isReloadRequired =', isReloadRequired);

  useEffect(() => {
    if (isReloadRequired || itemID) {
      //console.log('useEffect: params from state = ', params, 'params = ', params);
      dispatch(loadAction({ params, itemID }));
    };
  }, [dispatch, loadAction, params, isReloadRequired, itemID]);

  return { data, isLoading, isError, ...rest };
};