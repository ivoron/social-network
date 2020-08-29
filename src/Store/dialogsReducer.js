let initialState = {
  dialogs: [
    { id: 1, name: "Budd" },
    { id: 2, name: "Dodic" },
    { id: 3, name: "Mr. Flinstone" },
    { id: 4, name: "Reptiloid" },
    { id: 5, name: "Johny" },
  ],
  messages: [
    { id: 1, message: "Привет))" },
    { id: 2, message: "Братан, займи косарь до зп" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND-MESSAGE":
      let newMessage = {
        id: state.messages.length + 1,
        message: action.messageBody,
      };
      if (newMessage.message && newMessage.message.trim()) {
        return { ...state, messages: [...state.messages, newMessage] };
      }
      return state;
    default:
      return state;
  }
};
export const sendMessage = (messageBody) => ({
  type: "SEND-MESSAGE",
  messageBody,
});

export default dialogsReducer;
