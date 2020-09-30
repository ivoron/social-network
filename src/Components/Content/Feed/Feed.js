import React from "react";
import Post from "./Post";
import { Field, reduxForm } from "redux-form";

export default function Feed(props) {
  // список постов из стора
  let postItems = props.profilePage.postText.map((post) => (
    <Post key={post.id} userName={post.user} postText={post.text} />
  ));
  // форма добавления поста
  const FeedForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <Field
          placeholder="What's new?"
          className="addPost"
          component={"textarea"}
          name="newpost"
        />
        <br />
        <label> <Field component={"input"} type="checkbox" name="share" /> Share with comrades</label>
        <button> Add </button>
      </form>
    );
  };
  const FeedFormRedux = reduxForm({
    form: "add-new-post",
  })(FeedForm);
  const addPost = (post) => {
    props.addPost(post.newpost);
  };
  return (
    <div className="feedBody">
      <FeedFormRedux onSubmit={addPost} />
      <h3> My whole life </h3>
      {postItems}
    </div>
  );
}
