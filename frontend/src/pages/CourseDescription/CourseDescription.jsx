import "./CourseDescription.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { request } from "../../utils/request";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@material-tailwind/react";
import * as courseApi from "../../api/course";

const CourseDescription = () => {
   const navigate = useNavigate();
   const { courseId } = useParams();
    const { userRole, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState();

  //Fetch course data
  useEffect(() => {
    request.get(`/courses/${courseId}`).then((response) => {
      setCourseData(response.data);
      setIsLoading(false);
    });
  }, [courseId]);

  const enrollCourse = async () => {
    try {
    if (!isLoggedIn) {
      toast.error("Please log in to enroll in this course.");
      return;
    }
    if (userRole !== "customer") {
      navigate("/error/500")
    }
    await courseApi.enrollCourse(courseId);
    toast.success("Enrollment successful!");
    navigate("/courses/enrolled");
  } catch (err) {
        console.error("Enrollment failed:", err);
    toast.error("An error occurred.");
  }
  }

  return (
    isLoading ? (
      <Loading />
    ) : (
      <div className="job-details grow flex flex-col">
        <div>
          {/* Header with job details */}
        <header className="hero rounded-md">
          <div className="hero-content w-full p-8 flex">
            <div className="w-1/4">
              <img
                src={`${courseData.thumbnail}`}
                className="rounded-full w-44 h-44 mx-auto object-cover"
                alt="Course Thumbnail"
              />
            </div>
            <div className="w-3/4">
              <h1 className="text-3xl font-bold text-left pl-4">
                {courseData.title}
              </h1>
              <Link to={`/provider/${courseData.createdBy.id}`}>
                <p className="cursor-pointer text-xl py-6 text-left pl-4">
                  {courseData.createdBy.displayedName}
                </p>
              </Link>
              <ul className="grid grid-cols-2 gap-4 text-lg text-left">
                <li className="opacity-70 flex gap-2 ">
                  <ion-icon name="cash"></ion-icon>
                  Price: {courseData.price}
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="job-description bg-white rounded-md px-32 py-20 text-justify text-lg">
          {courseData.description}
        </main>
        {/* Enroll button */}
        {userRole !== "provider" && (
          <Button
            className="btn mt-14 mx-auto text-black text-base font-medium w-1/4 bg-[#ffce00] hover:bg-[#ffce00]"
            onClick={enrollCourse}
          >
            Enroll Now
          </Button>
        )}
      </div>
    </div>
  ));
};
export default CourseDescription;
