import React from "react";
import { useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
import Error from "../components/Error";
import Loader from "../components/Loader";

export const withRedux = ({ WrappedComponent, selector, actions, itemID, ...rest }) => (props) => {
  const dispatch = useDispatch();
  const result = useFetch(selector, actions.load, itemID);

  return (
    <WrappedComponent { ...result } actions={{ ...actions, dispatch }} { ...rest } { ...props } >
      { props.children }
      { result.isLoading && <Loader isLoading={ result.isLoading } /> }
      { result.error && <Error onRetry={ () => dispatch(actions.reload()) } error={ result.error } /> }
    </WrappedComponent>
  );
};