import { useState, useEffect, ChangeEvent } from "react";
import React from "react";

type PropsType = {
  status: string;
  setStatus: (status: string) => void;
};
const ProfileStatus: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  let [error, setError] = useState(false);
  let msg = `Maximum length is 300 symbols, now ${
    status ? status.length : null
  }`;
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);
  const editStatus = () => {
    setEditMode(true);
  };
  const seveStatus = () => {
    setEditMode(false);
    props.setStatus(status);
  };
  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
    if (status.length > 298) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <div>
      {editMode ? (
        <>
          <input
            id={error ? "warning" : undefined}
            autoFocus={true}
            onChange={changeStatus}
            onBlur={seveStatus}
            value={status}
          />
          <br />
          <span style={{ color: "red" }}>{error && msg}</span>
        </>
      ) : (
        <span
          className={!status ? "editStatus" : "trueStatus"}
          onClick={editStatus}
        >
          {props.status || "change status..."}
        </span>
      )}
    </div>
  );
};
export default ProfileStatus;
