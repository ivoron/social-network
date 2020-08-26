import React from "react";
import FeedContainer from "../Feed/FeedContainer";
import ProfileContainer from "./ProfileContainer";

export default function ProfilePage() {
  return (
    <div>
      <ProfileContainer/>
      <FeedContainer/>
    </div>
  );
}
