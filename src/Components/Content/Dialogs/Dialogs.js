import React from "react";
import Dialog from "./Dialog";
import Chat from "./Chat";
import { reduxForm, Field } from "redux-form";

export default function Dialogs({ dialogsPage, sendMessage }) {
  let dialogElements = dialogsPage.dialogs.map((user) => (
    <Dialog key={user.id} personId={user.id} personName={user.name} />
  )); // список диалогов из стора
  let messageElements = dialogsPage.messages.map((item) => (
    <Chat key={item.id} message={item.message} />
  )); // список сообщений из стора

  // форма добавления сообщений
  const AddMessageForm = ({ handleSubmit }) => {
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
  const MessageForm = reduxForm({
    form: "send-message",
  })(AddMessageForm);
  const onSubmit = (formData) => {
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
}
