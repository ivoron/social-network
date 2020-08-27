import React, { useState } from "react";
import userPic from "../../../assets/images/Cats.jpg";
// import ProfileStatus from "./ProfileStatus";
import PropfileStatus from "./StatusHooks";
import { ContactEditor, ProfileData } from "./ProfileData";

export default function Profile(props) {
  let { profile } = props;
  let { contacts } = profile;
  const [editMode, setEditMode] = useState(false);
  const uploadPhoto = (e) => {
    props.setProfilePhoto(e.target.files[0]);
  };
  const editProfile = () => {
    setEditMode(true);
  };
  const onSubmit = (formData) => {
    props.setProfileData(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className="pageCover">
      <div className="profileInfo">
        <div className="pagePhoto">
          <img
            src={profile.photos.large ? profile.photos.large : userPic}
            alt="pic"
            width="100%"
          />
          {props.isMyPage && <input type={"file"} onChange={uploadPhoto} />}
        </div>
        <div className="info">
          <h3>{profile.fullName}</h3>
          {/* <ProfileStatus status={props.status} setStatus={props.setStatus}/> */}
          {props.isMyPage ? (
            <PropfileStatus status={props.status} setStatus={props.setStatus} />
          ) : (
            <span>{props.status ? props.status : "no status"}</span>
          )}
          {editMode ? (
            <ContactEditor
              profile={profile}
              initialValues={profile}
              contacts={contacts}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              contacts={contacts}
              editProfile={editProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
