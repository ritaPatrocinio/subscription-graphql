import React from "react";

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return null;
  }
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        overflow: "hidden",
        overflowY: "scroll",
        maxHeight: 560,
        margin: 0,
      }}
    >
      {comments.map((comment) => {
        return (
          <li
            key={comment.id}
            style={{
              listStyle: "none",
              marginBottom: 6,
              width: "60%",
              alignSelf: comment.viewerDidAuthor ? "flex-end" : "flex-start",
            }}
          >
            {!comment.viewerDidAuthor && (
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  textAlign: "justify",
                  marginLeft: 25,
                  marginBottom: 5,
                  color: "#66666A",
                }}
              >
                {comment.author.login}
              </h3>
            )}

            <p
              style={{
                background: comment.viewerDidAuthor ? "#0B55DB" : "#434343",
                margin: 0,
                borderRadius: 40,
                padding: "10px 20px",
              }}
            >
              {comment.body}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Comments;
