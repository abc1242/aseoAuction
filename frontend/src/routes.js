import HomePage from "./components/HomePage/HomePage";
import HomeDiet from "./components/HomePage/HomeDiet";
import HomeRecipe from "./components/HomePage/HomeRecipe";
import HomeGroupMeeting from "./components/HomePage/HomeGroupMeeting";

export default [
  {
    path : '/',
    components : HomePage
  },
  {
    path : '/recipe',
    components : HomeRecipe
  },
  {
    path : '/diet',
    components : HomeDiet
  },
  {
    path : '/groupmeeting',
    components : HomeGroupMeeting
  },
] ;