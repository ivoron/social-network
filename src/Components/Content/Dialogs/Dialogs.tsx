import React from "react";
import Dialog from "./Dialog";
import Chat from "./Chat";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { InitStateType } from "../../../Store/dialogsReducer";

type PropsType = {
  dialogsPage: InitStateType;
  sendMessage: (message: string) => void;
};
type MessageFormDataType = {
  message: string;
};
const Dialogs: React.FC<PropsType> = ({ dialogsPage, sendMessage }) => {
  let dialogElements = dialogsPage.dialogs.map((user) => (
    <Dialog key={user.id} personId={user.id} personName={user.name} />
  )); // список диалогов из стора
  let messageElements = dialogsPage.messages.map((item) => (
    <Chat key={item.id} message={item.message} />
  )); // список сообщений из стора

  // форма добавления сообщений
  const AddMessageForm: React.FC<InjectedFormProps<MessageFormDataType>> = ({
    handleSubmit,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name={"message"}
          component={"textarea"}
          placeholder={"enter your message"}
          className="addMessage"
        />
        <br />
        <button>send</button>
      </form>
    );
  };
  const MessageForm = reduxForm<MessageFormDataType>({
    form: "send-message",
  })(AddMessageForm);
  const onSubmit = (formData: MessageFormDataType) => {
    sendMessage(formData.message);
  };
  return (
    <div className="dialogs">
      <div className="chatItems">
        <ul>{dialogElements}</ul>
      </div>
      <div className="chatBody">
        <div className="chatField">{messageElements}</div>
        <MessageForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
export default Dialogs;
