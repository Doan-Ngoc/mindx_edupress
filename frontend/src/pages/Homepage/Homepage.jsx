import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { request } from "../../utils/request";
import CourseList from "../../components/JobList/JobList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loading from "../../components/Loading";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  //Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limitPerPage = 2;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        //Fetch courses
        const response = await request.get(
          `/courses?page=${currentPage ||1}&limit=${limitPerPage}`
        );
        const { items, meta } = response.data;
        setAllCourses(items);
        console.log(items);
        setTotalPages(meta.totalPages);
        // Update the URL when changing the page
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", currentPage.toString());
        navigate(`${location.pathname}?${searchParams.toString()}`);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error fetching course data:",
          error.response?.data?.message || error.message
        );
        navigate("/error/500");
      }
    };
    fetchCourses();
  }, [currentPage, location.pathname, location.search, navigate]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="homepage grow flex flex-col gap-8 bg-[#e7e8ff]">
      <SearchBar />
      <CourseList allCourses={allCourses} />
      <div className="join pagination mx-auto">
        {Array.from({ length: totalPages }, (_, index) => (
          // Daisy UI pagination buttons
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${
              currentPage === index + 1 ? "btn-active" : ""
            } join-item btn`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
