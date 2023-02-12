import React, { useState } from "react";
import { useMutation } from "urql";

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      style={{ position: "sticky", bottom: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue("");
      }}
    >
      <input
        value={value}
        onChange={handleValueChange}
        placeholder="Message"
        style={{
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          border: "1px solid #A9A9A9",
          borderRadius: 20,
          padding: "5px 15px",
          background: "#2E2E2E",
          color: "white",
        }}
      ></input>
      <button
        type="submit"
        style={{
          position: "absolute",
          right: -30,
          top: 2,
          borderRadius: 100,
          background: "#0B55DB",
          color: "white",
          border: "none",
          padding: 3,
          width: 65,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        Send
      </button>
    </form>
  );
};

const NEW_COMMENT_MUTATION = `
mutation NewCommentMutation(
    $body: String!
    $subjectId: ID!
  ) {
    gitHub {
      addComment(
        input: {
          subjectId: $subjectId
          body: $body
          clientMutationId: ""
        }
      ) {
        commentEdge {
          node {
            author {
              login
            }
            body
            id
            url
            viewerDidAuthor
          }
        }
      }
    }
  }`;

const NewCommentInput = () => {
  const [mutationResult, executeMutation] = useMutation(NEW_COMMENT_MUTATION);
  const handleSubmit = (body) => {
    executeMutation({ subjectId: "I_kwDOI77I_s5eKPgq", body });
  };

  return <Input onSubmit={handleSubmit}></Input>;
};

export default NewCommentInput;
