import { useQuery } from "urql";

const COMMENTS_QUERY = `
query CommentsListQuery($repoOwner: String!, $repoName: String!, $issueNumber: Int!) {
    gitHub {
      repository(name: $repoName, owner: $repoOwner) {
        issue(number: $issueNumber) {
          id
          title
          bodyText
          comments(last: 100) {
            nodes {
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
    }
  }`;

const useCommentsHistory = (options) => {
  const { pause = false } = options;
  const [result] = useQuery({
    query: COMMENTS_QUERY,
    variables: {
      repoOwner: "ritaPatrocinio",
      repoName: "subscription-graphql",
      issueNumber: 1,
    },
    pause,
  });

  if (result.data) {
    return result.data.gitHub.repository.issue.comments.nodes;
  } else {
    return [];
  }
};

export default useCommentsHistory;
