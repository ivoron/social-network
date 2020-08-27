import React from "react";
import { connect } from "react-redux";
import { logOutThunk } from "../../Store/authReducer";
import Header from "./Header";
import "./header.css";

class HeaderAPI extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state) => ({
  userName: state.profilePage.profile.fullName,
  isAuth: state.auth.isAuth,
});

const HeaderContainer = connect(mapStateToProps, { logOutThunk })(HeaderAPI);
export default HeaderContainer;
