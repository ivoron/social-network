import React from "react";
import Navbar from "../Content/Navbar/Navbar";
import Preloader from "../../assets/Preloader/Preloader";
import ProfilePage from "./Profile/ProfilePage";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { initialApp } from "../../Store/appReducer";
import { compose } from "redux";
import { connect } from "react-redux";
import LazyLoading from "../../HOC/withLazyLoading";

const Login = React.lazy(() => import("./Login/Login"));
const DialogsContainer = React.lazy(() => import("./Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./Users/UsersContainer"));
const Page404 = React.lazy(() => import("./Page404"));

class Content extends React.Component {
  componentDidMount() {
    this.props.initialApp();
  }
  render() {
    if (!this.props.appInit) {
      return <Preloader />;
    }
    return (
      <div className="container">
        <Navbar />
        <div className="body">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/profile/:id?" render={() => <ProfilePage />} />
            <Route
              path="/dialogs"
              render={() => LazyLoading(DialogsContainer)}
            />
            <Route path="/users" render={() => LazyLoading(UsersContainer)} />
            <Route path="/login" render={() => LazyLoading(Login)} />
            <Route path="*" render={() => LazyLoading(Page404)} />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  appInit: state.app.appInit,
});
export default compose(
  withRouter,
  connect(mapStateToProps, { initialApp })
)(Content);
