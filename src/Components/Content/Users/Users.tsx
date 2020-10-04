import React from "react";
import User from "./User";
import Preloader from "../../../assets/Preloader/Preloader";
import Pagination from "./Pagination";
import {UsersType} from "../../../Store/usersReducer"

type PropsType = {
  users: Array<UsersType>
  setCurrentID: (id: number) => void
  followFetch: Array<number>
  followTrack: (id: number, followed: boolean) => void
  currentPage: number
  changePage: (page: number) => void
  totalCount: number 
  pageSize: number
  isLoading: boolean
}
export default function Users(props: PropsType){
  let userItems = props.users.map((user: UsersType) => (
    <User
      key={user.id}
      user={user}
      followFetch={props.followFetch}
      followTrack={props.followTrack}
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
