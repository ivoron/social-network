import { useState, useEffect } from "react";
import React from "react";

const ProfileStatus = (props) => {
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
  const changeStatus = (e) => {
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
            id={error && "warning"}
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
          value={status}
          onClick={editStatus}
        >
          {props.status || "change status..."}
        </span>
      )}
    </div>
  );
};
export default ProfileStatus;
