import React from "react";

export default function Chat(props: PropsType) {
  return (
    <div>
      <span>{props.message}</span> <br />
    </div>
  );
}
type PropsType = {
  message: string;
};
