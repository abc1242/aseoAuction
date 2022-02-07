import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.js";
// Login2는 임시
import Login2 from "./components/UserAuth/Login/Login2";
import Signup2 from "./components/UserAuth/Signup/Signup2";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/landingpage" />
      </Route>
      <Route path="/landingpage">
        <LandingPage />
      </Route>
      <Route path="/login">
        <Login2 />
      </Route>
      <Route path="/signup">
        <Signup2 />
      </Route>
    </Switch>
  );
}

export default App;
