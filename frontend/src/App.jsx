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
import Login from "./pages/Login";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import ManageCoursesForProviders from "./pages/ManageCourses/ManageCoursesForProviders";
import ManageCoursesForCustomers from "./pages/ManageCourses/ManageCoursesForCustomers";
import ProviderOnly from "./components/ProviderOnly";
import CustomerOnly from "./components/CustomerOnly";
import { ErrorPage } from "./pages/errors/ErrorPage";
import {NoPermission} from "./pages/errors/NoPermission";

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
        <Route path="/login" element={<Login />} />
        <Route path="/error/500" element={<ErrorPage />} />
        <Route path="/error/no-permission" element={<NoPermission />} />
          <Route element={<ProviderOnly />}>
          <Route path="/course/new" element={<CreateCourse />} />
          <Route path="/courses/created" element={<ManageCoursesForProviders />} />
          </Route>
          <Route element={<CustomerOnly />}>
          <Route path="/courses/enrolled" element={<ManageCoursesForCustomers />} />
          </Route>
        <Route path="/" element={<Homepage />} />

      </Routes>
      </section>
      </AuthProvider>
    </div>
  );
}

export default App;
