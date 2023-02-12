import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "urql";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import Comments from "./components/CommentsSubscription";
import Input from "./components/Input";

// const QUERY = `
// query ExampleQuery(
//   $repoOwner: String!
//   $repoName: String!
//   $issueNumber: Int!
// ) {
//   gitHub {
//     repository(name: $repoName, owner: $repoOwner) {
//       issue(number: $issueNumber) {
//         id
//         title
//         bodyText
//       }
//     }
//   }
// }`;

function App() {
  const { login, status } = useContext(AuthContext);
  // const [result, reExecuteQuery] = useQuery({
  //   query: QUERY,
  //   variables: {
  //     repoOwner: "ritaPatrocinio",
  //     repoName: "subscription-graphql",
  //     issueNumber: 1,
  //   },
  // });

  if (!status || !status.github) {
    return (
      <div>
        <h1>Log in to GitHub</h1>
        <p>In order to see your profile, you'll have to log in with GitHub</p>
        <button onClick={() => login("github")}>Log in with GitHub</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Width" >
          <Comments></Comments>
          <Input></Input>
        </div>
      </header>
    </div>
  );
}

export default App;
