import React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { requiredField, maxLengthIs } from "../../../Validators/validation";
import { Input } from "../../../Validators/WarningFieid";
import { connect } from "react-redux";
import { loginThunk, logOutThunk } from "../../../Store/authReducer";
import { Redirect } from "react-router-dom";
import "./login.css";
import { AppStateType } from "../../../Store/redux-store";
let maxLengthIs20 = maxLengthIs(20);

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  // форма логинизации + обработка ошибок
  const LoginForm: React.FC<
    InjectedFormProps<FormDataType, LoginPropsType> & LoginPropsType
  > = ({ handleSubmit, error, captchaUrl }) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          validate={[requiredField, maxLengthIs20]}
          name={"email"}
          component={Input}
          placeholder={"e-mail"}
        />
        <Field
          validate={[requiredField, maxLengthIs20]}
          name={"password"}
          component={Input}
          placeholder={"password"}
          type={"password"}
        />
        {captchaUrl && (
          <Field
            validate={[requiredField]}
            name={"captcha"}
            component={Input}
            placeholder={"captcha symbols"}
          />
        )}
        {captchaUrl && <img src={captchaUrl} alt="secure captcha" />}
        <div style={{ color: "red", marginLeft: 5 }}>{error}</div>
        <label style={{ marginRight: 23 }}>
          <Field name={"rememberMe"} component={"input"} type="checkbox" />
          Remember me
        </label>
        <button>login</button>
      </form>
    );
  };
  const ReduxLoginForm = reduxForm<FormDataType, LoginPropsType>({
    form: "login-form",
  })(LoginForm);
  const onSubmit = ({ email, password, rememberMe, captcha }: FormDataType) => {
    props.loginThunk(email, password, rememberMe, captcha);
  };
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className={"loginForm"}>
      <h2>Login or create an account</h2>
      <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  };
};
type LoginPropsType = {
  captchaUrl: string | null;
};
type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};
type MapDispatchPropsType = {
  loginThunk: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};
export default connect(mapStateToProps, { loginThunk, logOutThunk })(Login);
