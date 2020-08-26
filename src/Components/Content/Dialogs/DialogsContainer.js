import Dialogs from "./Dialogs";
import { sendMessage } from "../../../Store/dialogsReducer";
import { connect } from "react-redux";
import withRedirect from "../../../HOC/withRedirect";
import { compose } from "redux";
import "./dialogs.css";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose(
  connect(mapStateToProps, {
    sendMessage,
  }),
  withRedirect
)(Dialogs);
