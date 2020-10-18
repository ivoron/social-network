import Dialogs from "./Dialogs";
import { sendMessage } from "../../../Store/dialogsReducer";
import { connect } from "react-redux";
import withRedirect from "../../../HOC/withRedirect";
import { compose } from "redux";
import "./dialogs.css";
import { AppStateType } from "../../../Store/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    sendMessage,
  }),
  withRedirect
)(Dialogs);
