import React from "react";
import { reduxForm, Field } from "redux-form";
import { required, maxLengthIs } from "../../../Validators/validation";
import { Input } from "../../../Validators/WarningFieid";
import { connect } from "react-redux";
import { loginThunk, logOutThunk } from "../../../Store/authReducer";
import { Redirect } from "react-router-dom";
import "./login.css";
let maxLengthIs20 = maxLengthIs(20);

function Login(props) {
  const LoginForm = ({ handleSubmit, error }) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          validate={[required, maxLengthIs20]}
          name={"email"}
          component={Input}
          placeholder={"e-mail"}
        />
        <Field
          validate={[required, maxLengthIs20]}
          name={"password"}
          component={Input}
          placeholder={"password"}
          type={"password"}
        />
        {props.captchaUrl && (
          <Field
            validate={[required]}
            name={"captcha"}
            component={Input}
            placeholder={"captcha symbols"}
          />
        )}
        {props.captchaUrl && (
          <img src={props.captchaUrl} alt="secure captcha" />
        )}
        <div style={{ color: "red", marginLeft: 5 }}>{error}</div>
        <label style={{ marginRight: 23 }}>
          <Field name={"rememberMe"} component={"input"} type="checkbox" />
          Remember me
        </label>
        <button>login</button>
      </form>
    );
  };
  const ReduxLoginForm = reduxForm({
    form: "login-form",
  })(LoginForm);
  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    props.loginThunk(email, password, rememberMe, captcha);
  };
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className={"loginForm"}>
      <h2>Login or create an account</h2>
      <ReduxLoginForm onSubmit={onSubmit} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  };
};
export default connect(mapStateToProps, { loginThunk, logOutThunk })(Login);
