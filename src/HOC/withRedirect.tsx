import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../Store/redux-store";

type PropsType = {
  isAuth: boolean
}
const mapAuthToProps = (state: AppStateType) => ({ isAuth: state.auth.isAuth });
export default function withRedirect(Component: React.ComponentType) {
  class RedirectComponent extends React.Component<PropsType> {
    render() {
      if (!this.props.isAuth) return <Redirect to="/login" />;
      return <Component {...this.props} />;
    }
  }
  let AuthRedirect = connect(mapAuthToProps)(RedirectComponent);
  return AuthRedirect;
}
