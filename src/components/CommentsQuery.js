import React from "react";
import Comments from "./Comments";
import useCommentsHistory from "./hooks/useCommentsHistory";

const CommentsQuery = () => {
  const comments = useCommentsHistory();

  return <Comments comments={comments}></Comments>;
};

export default CommentsQuery;
