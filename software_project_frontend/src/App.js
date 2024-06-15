import logo from "./logo.svg";
import "./App.css";
import { LeftPane } from "./components/LeftPane/LeftPane";
import { RightPane } from "./components/RightPane/RightPane";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import RecentPage from "./pages/RecentPage";
import MyModulesPage from "./pages/MyModulesPage";
import NewModule from "./pages/NewModule";
import NewAssignmentPage from "./pages/NewAssignmentPage";
import BatchesPage from "./pages/BatchesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import AnswerScriptsPage from "./pages/AnswerScriptsPage";
import DataVisualizationPage from "./pages/DataVisualizationPage";
import ManualGradingPage from "./pages/ManualGradingPage";
import NewBatchPage from "./pages/NewBatchPage";
import EditModule from "./pages/EditModule";
import DeleteModule from "./pages/DeleteModule";
import "bootstrap/dist/css/bootstrap.min.css";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import DeleteAssignment from "./pages/DeleteAssignment";
import EditAssignment from "./pages/EditAssignment";
import MainLayout from "./pages/MainLayout";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
    <div id="App" className="background" style={{ backgroundColor: "#7894DB" }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/SignUp" element={<SignUp />}></Route>

          <Route element= {<MainLayout/>}>
            <Route exact path="/UserProfile" element={<UserProfile />}></Route>
            <Route exact path="/Dashboard" element={<RecentPage />}></Route>
            <Route exact path="/MyModulePage" element={<MyModulesPage />}></Route>
            <Route exact path="/NewModule" element={<NewModule />}></Route>
            <Route exact path="/Help" element={<Help />}></Route>
            <Route exact path="/Settings" element={<Settings />}></Route>
            <Route
              exact
              path="/NewAssignment"
              element={<NewAssignmentPage />}
            ></Route>
            <Route
              exact
              path="/Batches/:selectedModuleCode"
              element={<BatchesPage />}
            ></Route>
            <Route
              exact
              path="/Assignments/:selectedModuleCode/:batch"
              element={<AssignmentsPage />}
            ></Route>
            <Route
              exact
              path="/AnswerScripts/batch/:batch/modulecode/:selectedModuleCode/assignmentid/:assignmentid"
              element={<AnswerScriptsPage />}
            ></Route>
            <Route
              exact
              path="/DataVisualization/batch/:batch/modulecode/:selectedModuleCode/assignmentid/:assignmentid"
              element={<DataVisualizationPage />}
            ></Route>
            <Route
              exact
              path="/ManualGradingPage/batch/:batch/modulecode/:selectedModuleCode/assignmentid/:assignmentid/studentid/:studentid"
              element={<ManualGradingPage />}
            ></Route>
            <Route
              exact
              path="/NewBatchPage/:selectedModuleCode"
              element={<NewBatchPage />}
            ></Route>
            <Route
              exact
              path="/EditModule/:selectedModuleCode"
              element={<EditModule />}
            ></Route>
            <Route
              exact
              path="/DeleteModule/:selectedModuleCode"
              element={<DeleteModule />}
            ></Route>

            <Route
              exact
              path="/DeleteAssignment/:selectedModuleCode/:batch/:selectedAssignmentId"
              element={<DeleteAssignment />}
            ></Route>

            <Route
              exact
              path="/EditAssignment/:selectedModuleCode/:selectedAssignmentName/:batch/:selectedAssignmentId"
              element={<EditAssignment />}
            ></Route>
          </Route>
          

          {/* Define other routes as needed */}
        </Routes>
      </Router>
      {/* <Login/> */}
      {/* <SignUp/> */}
    </div>
    </SnackbarProvider>
  );
}

export default App;
