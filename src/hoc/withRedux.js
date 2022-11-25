import React from "react";
import { useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
import Error from "../components/Error";
import Loader from "../components/Loader";

export const withRedux = ({ WrappedComponent, selector, fetchAction, fetchUrl, reloadAction, setActiveAction }) => (props) => {
  const dispatch = useDispatch();
  const injectedProps = useFetch(selector, fetchAction, fetchUrl);
  const { isLoading, error } = injectedProps;
  const actions = { dispatch, fetchAction, reloadAction, setActiveAction };

  return (
    <WrappedComponent { ...injectedProps } { ...actions } { ...props } >
      <Loader isLoading={ isLoading } />
      <Error onRetry={ () => dispatch(reloadAction()) } error={ error } />
      { props.children }
    </WrappedComponent>
  );
};