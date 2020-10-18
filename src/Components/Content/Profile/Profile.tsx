import React, { useState, ChangeEvent } from "react";
import userPic from "../../../assets/images/Cats.jpg";
import ProfileStatus from "./ProfileStatus";
import { ProfileEditor, ProfileData } from "./ProfileData";
import { ProfileType } from "../../../Store/profileReducer";

type PropsType = {
  profile: ProfileType;
  setProfilePhoto: (photo: File) => void;
  isMyPage: boolean;
  status: string;
  setProfileData: (formData: ProfileType) => Promise<{}>;
  setStatus: (status: string) => void;
};

const Profile: React.FC<PropsType> = (props) => {
  let { profile } = props;
  let { contacts } = profile;
  const [editMode, setEditMode] = useState(false);
  // загрузка фото профиля на сервер
  const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.setProfilePhoto(e.target.files[0]);
    }
  };
  // редактирование данных пользователя
  const editProfile = () => {
    setEditMode(true);
  };
  const onSubmit = (formData: ProfileType) => {
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
          {props.isMyPage ? (
            <ProfileStatus status={props.status} setStatus={props.setStatus} />
          ) : (
            <span>{props.status ? props.status : "no status"}</span>
          )}
          {editMode ? (
            <ProfileEditor
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              contacts={contacts}
              editProfile={editProfile}
              isMyPage={props.isMyPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
