import React from "react";
import Dialog from "./Dialog";
import Chat from "./Chat";
import { reduxForm, Field } from "redux-form";

export default function Dialogs(props) {
  let dialogElements = props.dialogsPage.dialogs.map((user) => (
    <Dialog key={user.id} personId={user.id} personName={user.name} />
  ));
  let messageElements = props.dialogsPage.messages.map((item) => (
    <Chat key={item.id} message={item.message} />
  ));
  const AddMessageForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
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
    form: "add-message",
  })(AddMessageForm);
  const sendMessage = (message) => {
    props.sendMessage(message.message);
  };
  return (
    <div className="dialogs">
      <div className="chatItems">
        <ul>{dialogElements}</ul>
      </div>
      <div className="chatBody">
        <div className="chatField">{messageElements}</div>
        <MessageForm onSubmit={sendMessage} />
      </div>
    </div>
  );
}
