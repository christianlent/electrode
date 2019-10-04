import { connect, Provider } from "redux-bundler-preact";
import { ReactReduxContext } from "react-redux";
import React, { useContext } from "react";

export default function() {
  const Component = connect.apply(this, arguments);
  return () => {
    const { store } = useContext(ReactReduxContext);
    return (
      <Provider store={store}>
        <Component />
      </Provider>
    );
  };
}