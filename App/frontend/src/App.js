import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProjects from "./pages/UserProjects";


const App = () => {

  return (

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/create" element={<CreateProjectPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<CreateProjectPage />} />
        <Route path="/user_projects" element={<UserProjects />} />
      </Routes>


  )

}

export default App;
