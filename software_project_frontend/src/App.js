import logo from './logo.svg';
import './App.css';
import { LeftPane } from './components/LeftPane/LeftPane';
import { RightPane } from './components/RightPane/RightPane';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
<<<<<<< HEAD



=======
import RecentPage from './pages/RecentPage';
import MyModulesPage from './pages/MyModulesPage';
>>>>>>> 13c404647b8a14b5464773fce3000907f51c8df0


function App() {
  return (
    <div id='App' className='background' style={{backgroundColor: "#7894DB"}}>
      <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        {/* <Route exact path="/" element={<Login/>}></Route> */}
        <Route exact path="/SignUp" element={<SignUp/>}></Route>
<<<<<<< HEAD
      
=======
        <Route exact path="/RecentPage" element={<RecentPage/>}></Route>
        <Route exact path="/MyModulePage" element={<MyModulesPage/>}></Route>
>>>>>>> 13c404647b8a14b5464773fce3000907f51c8df0
        {/* Define other routes as needed */}
      </Routes>
    </Router>
      {/* <Login/> */}
      {/* <SignUp/> */} 
    </div>
    
  );
}

export default App;
