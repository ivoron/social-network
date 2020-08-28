import React from "react";
import pic from "../../../assets/images/cat1.jpg";
import { NavLink } from "react-router-dom";

export default function User(props) {
  const { user } = props;
  const path = "/profile/" + user.id;
  return (
    <div className="userItem">
      <div className="userPhoto">
        <NavLink to={path}>
          <img src={user.photos.small || pic} alt="user pic" />
        </NavLink>
      </div>
      <div className="userInfo">
        <strong>{user.name}</strong> <br />
        Status: <b>{user.status || "no status"} </b>
        <br />
        <p />
        <button
          id="followBtn"
          onClick={() => props.followTrack(user.id, user.followed)}
          disabled={props.followFetch.some((id) => id === user.id)}
        >
          {user.followed ? "unfollow" : "follow"}
        </button>
        <button>send message</button>
      </div>
    </div>
  );
}
