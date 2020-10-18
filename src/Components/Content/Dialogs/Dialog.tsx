import React from "react";
import { NavLink } from "react-router-dom";

export default function Chat(props: PropsType) {
  let path = "/dialogs/" + props.personId;
  return (
    <div>
      <li>
        <NavLink to={path}>{props.personName}</NavLink>
      </li>
    </div>
  );
}
type PropsType = {
  personId: number
  personName: string
}
