import React from "react";
import { connect } from "react-redux";
import { logOutThunk } from "../../Store/authReducer";
import Header, {
  MapPropsType,
  DispatchPropsType,
  FormDataType,
} from "./Header";
import "./header.css";
import { AppStateType } from "../../Store/redux-store";
import { InjectedFormProps } from "redux-form";

class HeaderAPI extends React.Component<
  InjectedFormProps<FormDataType> & MapPropsType & DispatchPropsType
> {
  render() {
    return <Header {...this.props} />;
  }
}
const mapStateToProps = (state: AppStateType) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

const HeaderContainer:any = connect(mapStateToProps, { logOutThunk })(HeaderAPI);
export default HeaderContainer;
