import React from "react";
import userPic from "../../../assets/images/Cats.jpg";
// import ProfileStatus from "./ProfileStatus";
import PropfileStatus from "./StatusHooks";

export default function Profile(props) {
  console.log(props)
  let { profile } = props;
  let { contacts } = profile;
  // let myPage = props.myID === props.userID;
  const uploadPhoto = (e) => {
    const photo = e.target.files[0]
    props.setProfilePhoto(photo)
  }
  return (
    <div className="pageCover">
      <div className="profileInfo">
        <div className="pagePhoto"> 
          <img
            src={profile.photos.large ? profile.photos.large : userPic}
            alt="pic"
            width="100%"
          />
          {props.isMyPage && <input type={"file"} onChange={uploadPhoto}/>}
        </div>
        <div className="info">
          <h3>{profile.fullName}</h3>
          {/* <ProfileStatus status={props.status} setStatus={props.setStatus}/> */}
          {props.isMyPage ? (
            <PropfileStatus status={props.status} setStatus={props.setStatus} />
          ) : (
            <span>{props.status ? props.status : "no status"}</span>
          )}
          <div>{profile.aboutMe}</div>
          <hr />
          <div>
            <a href={contacts.facebook}>{contacts.facebook}</a> <br />
            <a href={contacts.instagram}>{contacts.instagram}</a> <br />
            <a href={contacts.github}>{contacts.github}</a> <br />
            <a href={contacts.twitter}>{contacts.twitter}</a> <br />
            <a href={contacts.vk}>{contacts.vk}</a> <br />
          </div>
        </div>
      </div>
    </div>
  );
}
