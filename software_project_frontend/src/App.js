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
import RecentPage from './pages/RecentPage';
import MyModulesPage from './pages/MyModulesPage';
<<<<<<< HEAD
import NewModule from './pages/NewModule';
=======
import NewAssignmentPage from './pages/NewAssignmentPage';
import BatchesPage from './pages/BatchesPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AnswerScriptsPage from './pages/AnswerScriptsPage';
>>>>>>> 7f4f0c8a692163638845c479283ec5394dd7cadb


function App() {
  return (
    <div id='App' className='background' style={{backgroundColor: "#7894DB"}}>
      <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/UserProfile" element={<UserProfile/>}></Route>
        <Route exact path="/SignUp" element={<SignUp/>}></Route>
        <Route exact path="/RecentPage" element={<RecentPage/>}></Route>
        <Route exact path="/MyModulePage" element={<MyModulesPage/>}></Route>
<<<<<<< HEAD
        <Route exact path="/NewModule" element={<NewModule/>}></Route> 
=======
        <Route exact path="/NewAssignment" element={<NewAssignmentPage/>}></Route>
        <Route exact path="/Batches" element={<BatchesPage/>}></Route>
        <Route exact path="/Assignments" element={<AssignmentsPage/>}></Route>
        <Route exact path="/AnswerScripts" element={<AnswerScriptsPage/>}></Route>
>>>>>>> 7f4f0c8a692163638845c479283ec5394dd7cadb
        {/* Define other routes as needed */}
      </Routes>
    </Router>
      {/* <Login/> */}
      {/* <SignUp/> */} 
    </div>
    
  );
}

export default App;
