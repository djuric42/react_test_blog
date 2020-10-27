import axios from "../apis/jsonPlaceHolder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //LODASH CHAIN SETUP
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await axios.get("/posts");
  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};
export const fetchUser = id => async dispatch => {
  const response = await axios.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};