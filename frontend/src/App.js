import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Login from "./components/UserAuth/Login/Login";
import Signup from "./components/UserAuth/Signup/Signup";

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
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </Switch>
  );
}

export default App;
