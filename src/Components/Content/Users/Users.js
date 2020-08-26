import React from "react";
import User from "./User";
import Preloader from "../../../assets/Preloader/Preloader";
import Pagination from "./Pagination";

export default function Users(props) {
  let userItems = props.users.map((user) => (
    <User
      key={user.id}
      user={user}
      unfollow={props.unfollow}
      setCurrentID={props.setCurrentID}
      followedToggle={props.followedToggle}
      follow={props.follow}
      followFetch={props.followFetch}
    />
  ));
  const pagination = (
    <Pagination
      currentPage={props.currentPage}
      changePage={props.changePage}
      totalCount={props.totalCount}
      pageSize={props.pageSize}
    />
  );

  return (
    <div>
      {pagination}
      {props.isLoading ? <Preloader /> : userItems}
      {!props.isLoading && props.users.length > 4 && pagination}
    </div>
  );
}
