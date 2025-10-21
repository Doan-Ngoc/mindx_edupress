import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import Homepage from "./pages/Homepage/Homepage";
import SearchPage from "./pages/SearchPage/SearchPage";
function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Sidebar />
      <section className="page-content overflow-y-scroll">
      <Routes>
        <Route path="/course/:courseId" element={<CourseDescription />} />
        <Route path="/courses/search" element={<SearchPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
      </section>
      </AuthProvider>
    </div>
  );
}

export default App;
