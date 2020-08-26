import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

let mapAuthToProps = (state) => ({ isAuth: state.auth.isAuth });
export default function withRedirect(Component) {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Redirect to="/login" />;
      return <Component {...this.props} />;
    }
  }
  let AuthRedirect = connect(mapAuthToProps)(RedirectComponent);
  return AuthRedirect;
}
