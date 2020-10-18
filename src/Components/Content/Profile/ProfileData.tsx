import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { Input } from "../../../Validators/WarningFieid";
import { ProfileType, ContactsType } from "../../../Store/profileReducer";

type ContactsPropsType = {
  contactKey: string | null;
  contactValue: string | null;
};

const Contacts: React.FC<ContactsPropsType> = ({
  contactKey,
  contactValue,
}) => {
  // отображение списка контактов
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

type ProfilePropsType = {
  profile: ProfileType;
  contacts: ContactsType;
  editProfile: () => void;
  isMyPage: boolean;
};
export const ProfileData: React.FC<ProfilePropsType> = ({
  profile,
  contacts,
  editProfile,
  isMyPage,
}) => {
  //данные профиля в режиме просмотра
  return (
    <>
      <hr />
      <span>{profile.lookingForAJob && "В поиске работы."}</span>
      <br />
      <span>Скиллы: {profile.lookingForAJobDescription}</span>
      <div>
        {Object.keys(contacts).map((key) => (
          <Contacts
            key={key}
            contactKey={contacts[key as keyof ContactsType]}
            contactValue={contacts[key as keyof ContactsType]}
          />
        ))}
      </div>
      {isMyPage && <button onClick={editProfile}>edit</button>}
    </>
  );
};

type DataFormPropsType = {
  profile: ProfileType;
};
const DataFormEditor: React.FC<
  InjectedFormProps<ProfileType, DataFormPropsType> & DataFormPropsType
> = ({ profile, handleSubmit, error }) => {
  // данные профиля в режиме редактирования
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
        component={"textarea"} //вместо инпута
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
      {Object.keys(profile.contacts).map((key) => (
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
export const ProfileEditor = reduxForm<ProfileType, DataFormPropsType>({
  form: "profile-editor",
})(DataFormEditor);
