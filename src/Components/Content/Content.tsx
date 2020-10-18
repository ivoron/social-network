import React from "react";
import Navbar from "./Navbar/Navbar";
import Preloader from "../../assets/Preloader/Preloader";
import ProfilePage from "./Profile/ProfilePage";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { initialApp } from "../../Store/appReducer";
import { compose } from "redux";
import { connect } from "react-redux";
import LazyLoading from "../../HOC/withLazyLoading";
import { AppStateType } from "../../Store/redux-store";

const Login = React.lazy(() => import("./Login/Login"));
const DialogsContainer = React.lazy(() => import("./Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./Users/UsersContainer"));
const Page404 = React.lazy(() => import("./Page404"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initialApp: () => void;
};
class Content extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initialApp();
  }
  render() {
    // инициализация приложения = загрузка данных из API
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
const mapStateToProps = (state: AppStateType) => ({
  appInit: state.app.appInit,
});
export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initialApp })
)(Content);
