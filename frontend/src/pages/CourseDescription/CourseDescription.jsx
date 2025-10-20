import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import * as applicantApi from "../../api/applicant";
import { request } from "../../utils/request";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import "./CourseDescription.css";
import {
  Button,
} from "@material-tailwind/react";

const CourseDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  // const { isLoggedIn, accessToken, accountRole } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  //Fetch course data
  useEffect(() => {
    request.get(`/courses/${courseId}`).then((response) => {
      setCourseData(response.data);
      setIsLoading(false);
    });
  }, [courseId]);

  //Submit application
  // const submitApplication = async () => {
  //   try {
  //     setOpenDialog(!openDialog);
  //     await applicantApi.sendApplication(accessToken, courseId);
  //     toast.success("Your application has been sent!");
  //     navigate("/job/applied");
  //   } catch (err) {
  //     console.error(
  //       "Sending application failed",
  //       err.response?.data?.message || err.message
  //     );
  //     toast.error("Something went wrong! Please try again later.");
  //   }
  // };

  return isLoading ? (
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
              <Link to={`/profile/company/${courseData.createdBy}`}>
                <p className="cursor-pointer text-xl py-6 text-left pl-4">
                  {courseData.createdBy.name}
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
        <Button
          className="btn mt-14 mx-auto text-black text-base font-medium w-1/4 bg-[#ffce00] hover:bg-[#ffce00]"
          onClick={() => setOpenDialog(!openDialog)}
        >
          Enroll Now
        </Button>

        {/* Dialog after clicking Enroll Now button */}
        {/* <Dialog open={openDialog} size="xs" className="w-44">
          {isLoggedIn ? (
            // Dialog for applicant
            accountRole === "applicant" ? (
              <DialogBody className="font-normal text-lg text-center ">
                Would you like to enroll in this course? Click OK to proceed.
              </DialogBody>
            ) : (
              //Dialog if logged in as other roles
              <DialogBody className="font-normal text-lg text-center ">
                You need an applicant account to enroll in courses.
              </DialogBody>
            )
          ) : (
            //Dialog if user haven't logged in
            <DialogBody className="font-medium text-lg text-center ">
              Log in required
            </DialogBody>
          )} */}

        {/* Dialog to confirm enrollment */}
        {/* {accountRole === "applicant" ? (
            <DialogFooter className="flex justify-center gap-3">
              <Button
                className="bg-[#ffce00] text-black text-base font-medium"
                // onClick={submitApplication}
              >
                <span>Yes</span>
              </Button>
              <Button
                variant="text"
                color="gray"
                onClick={() => setOpenDialog(!openDialog)}
                className="mr-1 text-base"
              >
                <span>Cancel</span>
              </Button>
            </DialogFooter>
          ) : (
            //Dialog to abandon action if not logged in as customer
            <DialogFooter className="flex justify-center">
              <Button
                className="bg-[#ffce00] text-base text-black "
                color="gray"
                onClick={() => setOpenDialog(!openDialog)}
              >
                <span>OK</span>
              </Button>
            </DialogFooter>
          )}
        </Dialog> */}
      </div>
    </div>
  );
};

export default CourseDescription;
