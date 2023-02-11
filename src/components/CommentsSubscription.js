import React, { useEffect, useState } from "react";
import { useSubscription } from "urql";
import Comments from "./Comments";
import useCommentsHistory from "./hooks/useCommentsHistory";

const COMMENTS_LIST_SUBSCRIPTION = `
subscription CommentsListSubscription($repoOwner: String = "", $repoName: String = "") {
    github {
      issueCommentEvent(input: {repoOwner: $repoOwner, repoName: $repoName}) {
        action
        comment {
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
  }`;

const CommentsSubscription = () => {
  const handleSubscription = (comments = [], commentEvent) => {
    if (!commentEvent) {
      return null;
    }
    return [...comments, commentEvent.github.issueCommentEvent.comment];
  };

  const [pauseCommentsHistory, setPauseCommentsHistory] = useState(false);

  const commentsHistory = useCommentsHistory({ pause: pauseCommentsHistory });
  const commentsHistoryLength = commentsHistory.length;

  useEffect(() => {
    if (commentsHistoryLength !== 0) {
      setPauseCommentsHistory(true);
    }
  }, []);

  const [commentSubscriptionResult] = useSubscription(
    {
      query: COMMENTS_LIST_SUBSCRIPTION,
      variables: {
        repoOwner: "ritaPatrocinio",
        repoName: "subscription-graphql",
      },
    },
    handleSubscription
  );
  console.log(
    "🚀 ~ file: CommentsSubscription.js:30 ~ commentsSubscription ~ commentSubscriptionResult",
    { commentSubscriptionResult }
  );

  const commentsWithHistory = [
    ...commentsHistory,
    ...(commentSubscriptionResult.data || []),
  ];

  return <Comments comments={commentsWithHistory}></Comments>;
};

export default CommentsSubscription;
