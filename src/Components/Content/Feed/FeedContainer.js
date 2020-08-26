import Feed from "./Feed";
import { addPost } from "../../../Store/profileReducer";
import { connect } from "react-redux";
import "./feed.css"

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
  };
};

const FeedContainer = connect(mapStateToProps, {addPost})(Feed);
export default FeedContainer;
