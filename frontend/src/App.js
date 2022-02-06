import React, { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.js";
// import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 App.js에서 삭제함
import HomeNavbar from "./components/HomePage/HomeNavbar.js";
import HomePage from "./components/HomePage/HomePage";
import HomeDiet from "./components/HomePage/HomeDiet";
import HomeRecipe from "./components/HomePage/HomeRecipe";
import HomeGroupMeeting from "./components/HomePage/HomeGroupMeeting";
// routes로 넘길거
import {
  BrowserRouter as Router,
  // Switch, react-router-dom이 버전6로되믄서 더이상 지원안함 Routes로 써야함
  Routes,
  Route,
  Link,
} from "react-router-dom";
import routes from "./routes";

function App() {
  const [isLogined, setIsLogined] = useState(true);

  return (
    <Router>
      <div className="App">
        {/* {isLogined ? (
          <div>
            <LandingPage />
          </div>
        ) : (
          <div>
            <HomeNavbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe" element={<HomeRecipe />} />
              <Route path="/diet" element={<HomeDiet />} />
              <Route path="/groupmeeting" element={<HomeGroupMeeting />} />
            </Routes>
          </div>
        )} */}
        폰트 적용 확인
      </div>
    </Router>
  );
}

export default App;
