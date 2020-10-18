import React from "react";
import {
  setCurrentPage,
  getUsersThunk,
  followTrack,
  UsersType,
} from "../../../Store/usersReducer";
import { setCurrentID } from "../../../Store/profileReducer";
import withRedirect from "../../../HOC/withRedirect";
import { compose } from "redux";
import { getUsers } from "../../../assets/Selectors/user-selectors";
import "./users-page.css";
import { AppStateType } from "../../../Store/redux-store";
import { connect } from "react-redux";
import Users from "./Users";

type DispatchPropsType = {
  getUsersThunk: (currentPage: number, pageSize: number) => void;
  setCurrentPage: (page: number) => void;
  changePage: (page: number) => void;
  setCurrentID: (id: number) => void;
  followTrack: (id: number, followed: boolean) => void;
};
type StatePropsType = {
  users: Array<UsersType>;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  isLoading: boolean;
  followFetch: Array<number>;
};
type PropsType = StatePropsType & DispatchPropsType;
class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { getUsersThunk, currentPage, pageSize } = this.props;
    getUsersThunk(currentPage, pageSize);
  }
  changePage = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.getUsersThunk(page, this.props.pageSize);
  };
  render() {
    return (
      <Users
        users={this.props.users}
        changePage={this.changePage}
        pageSize={this.props.pageSize}
        totalCount={this.props.totalCount}
        currentPage={this.props.currentPage}
        isLoading={this.props.isLoading}
        setCurrentID={this.props.setCurrentID}
        followFetch={this.props.followFetch}
        followTrack={this.props.followTrack}
      />
    );
  }
}
const mapStateToprops = (state: AppStateType): StatePropsType => {
  return {
    users: getUsers(state),
    totalCount: state.usersPage.totalCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
    followFetch: state.usersPage.followFetch,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToprops, {
    setCurrentPage,
    setCurrentID,
    getUsersThunk,
    followTrack,
  }),
  withRedirect
)(UsersContainer);
