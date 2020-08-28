import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../../Validators/WarningFieid";

const Contact = ({ contactKey, contactValue }) => {
  return (
    <div>
      {contactValue && (
        <a href={contactValue} target={"blanc"}>
          {contactKey}
        </a>
      )}
    </div>
  );
};
export const ProfileData = ({ profile, contacts, editProfile, isMyPage }) => {
  return (
    <>
      <hr />
      <div> О себе: {profile.aboutMe}</div>
      <span>{profile.lookingForAJob && "В поиске работы."}</span>
      <br />
      <span>Скиллы: {profile.lookingForAJobDescription}</span>
      <div>
        {Object.keys(contacts).map((key) => (
          <Contact key={key} contactValue={contacts[key]} contactKey={contacts[key]} />
        ))}
      </div>
      {isMyPage && <button onClick={editProfile}>edit</button>}
    </>
  );
};
const DataFormEditor = ({ contacts, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <span>Name:</span>
      <Field
        validate={[]}
        name={"fullName"}
        component={Input}
        placeholder={"full name"}
      />
      <span>About me:</span>
      <Field
        validate={[]}
        name={"aboutMe"}
        component={"textarea"}  //вместо инпута
        placeholder={"about me"}
      />
      <label style={{ marginRight: 23 }}>
        <Field name={"lookingForAJob"} component={"input"} type="checkbox" />В
        поиске работы
      </label>
      <br />
      <span>Professional skills:</span>
      <Field
        validate={[]}
        name={"lookingForAJobDescription"}
        component={"textarea"} //вместо инпута
        placeholder={"your professional skills"}
      />
      <span>contacts:</span>
      {Object.keys(contacts).map((key) => (
        <Field
          key={key}
          name={`contacts.${key}`}
          component={Input}
          placeholder={key + " profile"}
        />
      ))}
      <hr />
      <div style={{ color: "red", marginLeft: 5 }}>{error}</div>
      <button>save changes</button>
    </form>
  );
};
export const ProfileEditor = reduxForm({ form: "profile-editor" })(
  DataFormEditor
);
