import React from "react";
import Post from "./Post";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { PostType } from "../../../Store/profileReducer";

type PropsType = {
  postList: Array<PostType>;
  addPost: (postText: string) => void;
};
type FormDataType = {
  newpost: string;
};
const Feed: React.FC<PropsType> = ({ postList, addPost }) => {
  // список постов из стора
  let postItems = postList.map((post) => (
    <Post key={post.id} userName={post.user} postText={post.text} />
  ));
  // форма добавления поста

  const FeedForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <Field
          placeholder="What's new?"
          className="addPost"
          component={"textarea"}
          name="newpost"
        />
        <br />
        <label>
          {" "}
          <Field component={"input"} type="checkbox" name="share" /> Share with
          comrades
        </label>
        <button> Add </button>
      </form>
    );
  };

  const FeedFormRedux = reduxForm<FormDataType>({
    form: "add-new-post",
  })(FeedForm);

  const addNewPost = ({ newpost }: FormDataType) => {
    addPost(newpost);
  };

  return (
    <div className="feedBody">
      <FeedFormRedux onSubmit={addNewPost} />
      <h3> My whole life </h3>
      {postItems}
    </div>
  );
};
export default Feed;
