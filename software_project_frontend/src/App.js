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





function App() {
  return (
    <div id='App' className='background' style={{backgroundColor: "#7894DB"}}>
      <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        {/* <Route exact path="/" element={<Login/>}></Route> */}
        <Route exact path="/SignUp" element={<SignUp/>}></Route>
      
        {/* Define other routes as needed */}
      </Routes>
    </Router>
      {/* <Login/> */}
      {/* <SignUp/> */} 
    </div>
    
  );
}

export default App;
