import React from "react";
import {
  setCurrentPage,
  getUsersThunk,
  followThunk,
  unfollowThunk,
} from "../../../Store/usersReducer";
import { setCurrentID } from "../../../Store/profileReducer";
import withRedirect from "../../../HOC/withRedirect";
import { compose } from "redux";
import { getUsers } from "../../../assets/Selectors/user-selectors";
import "./users-page.css"
const { connect } = require("react-redux");
const { default: Users } = require("./Users");

class UsersAPI extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 1) {
      this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }
  }
  changePage = (page) => {
    this.props.setCurrentPage(page);
    this.props.getUsersThunk(page, this.props.pageSize);
  };
  follow = (id) => {
    this.props.followThunk(id);
  };
  unfollow = (id) => {
    this.props.unfollowThunk(id);
  };

  render() {
    return (
      <Users
        users={this.props.users}
        follow={this.follow}
        unfollow={this.unfollow}
        changePage={this.changePage}
        pageSize={this.props.pageSize}
        totalCount={this.props.totalCount}
        currentPage={this.props.currentPage}
        isLoading={this.props.isLoading}
        setCurrentID={this.props.setCurrentID}
        followFetch={this.props.followFetch}
      />
    );
  }
}
const mapStateToprops = (state) => {
  return {
    users: getUsers(state),
    totalCount: state.usersPage.totalCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
    followFetch: state.usersPage.followFetch,
  };
};

export default compose(
  connect(mapStateToprops, {
    setCurrentPage,
    setCurrentID,
    getUsersThunk,
    followThunk,
    unfollowThunk,
  }),
  withRedirect
)(UsersAPI);
