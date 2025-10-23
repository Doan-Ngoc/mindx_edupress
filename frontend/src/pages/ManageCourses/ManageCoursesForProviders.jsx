import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as courseApi from "../../api/course";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Course Title", "Instructor"];

function ManageCoursesForProviders() {
  const navigate = useNavigate();
  const [createdCourses, setCreatedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreatedCourses = async () => {
      try {
        const res = await courseApi.getCreatedCourses();
        setCreatedCourses(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error fetching course data:",
          error.response?.data?.message || error.message
        );
        navigate("/error/500");
      }
    };
    fetchCreatedCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  if (!isLoading && createdCourses.length <= 0) {
    return (
      <div className="flex items-center justify-center h-full">
        {`You haven't created any courses.`}
      </div>
    );
  }

  return (
    <>
      <table className="w-full bg-white py-auto rounded-lg min-w-max table-auto ">
        {/* Table head */}
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-indigo-100 py-4 "
              >
                <Typography
                  color="blue-gray"
                  className="leading-none opacity-70 font-bold "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {createdCourses.map(({ id, title, createdBy }, index) => {
            const isLast = index === createdCourses.length - 1;
            const classes = isLast
              ? "py-4 "
              : "py-4 border-b border-blue-gray-50";

            return (
              <tr key={id}>
                <td className={classes}>
                  {/* Course details */}
                  <div className="text-center">
                    <Link to={`/course/${id}`}>
                      <div className="text-center">
                        <Typography
                          color="blue-gray"
                          className="font-semibold text-center w-fit m-auto"
                        >
                          {title}
                        </Typography>
                      </div>
                    </Link>
                  </div>
                </td>
                <td className={classes}>
                  <div className="text-center">
                    <div className="text-center">
                      <Link to={`/provider/${createdBy.id}`}>
                        <Typography
                          color="blue-gray"
                          className="font-semibold text-center w-fit m-auto"
                        >
                          {createdBy.displayedName}
                        </Typography>
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ManageCoursesForProviders;
