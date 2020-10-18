import Feed from "./Feed";
import { addPost } from "../../../Store/profileReducer";
import { connect } from "react-redux";
import "./feed.css"
import { AppStateType } from "../../../Store/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    postList: state.profilePage.postList,
  };
};

const FeedContainer = connect(mapStateToProps, {addPost})(Feed);
export default FeedContainer;
