import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getPropfileThunk,
  setStatusThunk,
  getStatusThunk,
  setProfilePhoto,
  setProfileData,
  ProfileType,
} from "../../../Store/profileReducer";
import { withRouter } from "react-router-dom";
import withRedirect from "../../../HOC/withRedirect";
import "./profile-page.css";
import { compose } from "redux";
import { AppStateType } from "../../../Store/redux-store";

type MapDispatchPropsType = {
  match: {
    params: {
      id: number;
    };
  };
  getPropfileThunk: (id: number) => void;
  getStatusThunk: (id: number) => void;
  setStatusThunk: (status: string) => void;
  setProfilePhoto: (photo: File) => void;
  setProfileData: (profileData: ProfileType) => Promise<{}>;
};
type MapStatePropsType = {
  profile: ProfileType;
  myID: number;
  userID: number;
  status: string;
  myProfile: number;
};
class ProfileAPI extends React.Component<
  MapStatePropsType & MapDispatchPropsType
> {
  componentDidMount() {
    let myProfile = this.props.myProfile; //мой айди
    let user = this.props.match.params.id; //айди юзера через роутер
    const { getPropfileThunk, getStatusThunk } = this.props;
    getPropfileThunk(user ? user : myProfile);
    getStatusThunk(user ? user : myProfile);
  }
  componentDidUpdate(prevProps: MapDispatchPropsType) {
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

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  myID: state.auth.id,
  userID: state.profilePage.currentID,
  status: state.profilePage.status,
  myProfile: state.auth.id,
});
export default compose<React.ComponentType>(
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
