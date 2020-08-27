import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getPropfileThunk,
  setStatusThunk,
  getStatusThunk,
  setProfilePhoto,
  setProfileData,
} from "../../../Store/profileReducer";
import { withRouter } from "react-router-dom";
import withRedirect from "../../../HOC/withRedirect";
import "./profile-page.css";
import { compose } from "redux";

class ProfileAPI extends React.Component {
  componentDidMount() {
    let myProfile = this.props.myProfile; //мой айди
    let user = this.props.match.params.id; //айди юзера через роутер
    const { getPropfileThunk, getStatusThunk } = this.props;
    getPropfileThunk(user ? user : myProfile);
    getStatusThunk(user ? user : myProfile);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let myID = this.props.myProfile;
      const { getPropfileThunk, getStatusThunk } = this.props;
      getPropfileThunk(myID);
      getStatusThunk(myID);
    }
  }
  render() {
    return (
      <Profile
        profile={this.props.profile}
        status={this.props.status}
        setStatus={this.props.setStatusThunk}
        isMyPage={this.props.myID === this.props.userID}
        setProfilePhoto={this.props.setProfilePhoto}
        setProfileData={this.props.setProfileData}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  myID: state.auth.id,
  userID: state.profilePage.currentID,
  status: state.profilePage.status,
  myProfile: state.auth.id,
});
export default compose(
  connect(mapStateToProps, {
    getPropfileThunk,
    getStatusThunk,
    setStatusThunk,
    setProfilePhoto,
    setProfileData,
  }),
  withRedirect,
  withRouter
)(ProfileAPI);
