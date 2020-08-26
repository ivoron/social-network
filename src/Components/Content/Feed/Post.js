import React from "react";
import picture from "../../../assets/images/pictcha.jpg";

export default function Post(props) {
  return (
    <div className="postBody">
      <div className="postInfo">
        <img src={picture} alt="userpic" className="postPhoto" />
        <b>{props.userName}</b>
      </div>
      <span> {props.postText} </span>
      <br />
      <div className="postButtons">
        <button> ответить </button>
        <button> удалить </button>
      </div>
    </div>
  );
}
