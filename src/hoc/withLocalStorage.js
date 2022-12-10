import React from "react";
import useGetFromLocalStorage from "../hooks/useGetFromLocalStorage";

export const withLocalStorage = ({ WrappedComponent, selector, actions, localStorageKey, dataTransformationFunction, ...rest }) => (props) => {
  const result = useGetFromLocalStorage(selector, actions.setData, localStorageKey);

  //console.log('withLocalStorage result BEFORE transformation= ', result);
  //console.log('withLocalStorage transformation= ', dataTransformationFunction);
  const transformed = (dataTransformationFunction == null) ? result : dataTransformationFunction(result);
  //console.log('withLocalStorage result AFTER transformation= ', transformed);

  return (
    <WrappedComponent data={ transformed } actions={ actions } { ...rest } { ...props } >
      { props.children }
    </WrappedComponent>
  );
};