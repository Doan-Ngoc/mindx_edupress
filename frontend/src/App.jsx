import "./App.css";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/course/:courseId" element={<CourseDescription />} />
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
      <section className="page-content overflow-y-scroll"></section>
    </div>
  );
}

export default App;
