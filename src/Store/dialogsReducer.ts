import { InferActionTypes } from "./redux-store";

let initialState = {
  dialogs: [
    { id: 1, name: "Budd" },
    { id: 2, name: "Dodic" },
    { id: 3, name: "Mr. Flinstone" },
    { id: 4, name: "Reptiloid" },
    { id: 5, name: "Johny" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Привет))" },
    { id: 2, message: "Братан, займи косарь до зп" },
  ] as Array<MessageType>,
};
type DialogType = {
  id: number;
  name: string;
};
type MessageType = {
  id: number;
  message: string;
};
export type InitStateType = typeof initialState;
const dialogsReducer = (
  state = initialState,
  action: ActionType
): InitStateType => {
  switch (action.type) {
    case "SEND_MESSAGE":
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

type ActionType = InferActionTypes<typeof actions>;

export const actions = {
  sendMessage: (messageBody: string) =>
    ({
      type: "SEND_MESSAGE",
      messageBody,
    } as const),
};
export const sendMessage = actions.sendMessage;
export default dialogsReducer;
