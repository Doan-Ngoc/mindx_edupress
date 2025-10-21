import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import Homepage from "./pages/Homepage/Homepage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Signup } from "./pages/SignUp/Signup";
import NewCustomer from "./pages/SignUp/NewCustomer";
import NewProvider from "./pages/SignUp/NewProvider";
function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Sidebar />
      <section className="page-content overflow-y-scroll">
      <Routes>
        <Route path="/course/:courseId" element={<CourseDescription />} />
        <Route path="/courses/search" element={<SearchPage />} />
        <Route path="/signup/customer" element={<NewCustomer />} />
        <Route path="/signup/provider" element={<NewProvider />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
      </section>
      </AuthProvider>
    </div>
  );
}

export default App;
