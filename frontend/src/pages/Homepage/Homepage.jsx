import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { request } from "../../utils/request";
import CourseList from "../../components/CourseList/CourseList";
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

  // Lấy page từ query lúc load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromQuery = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(pageFromQuery);
  }, [location.search]);

  // Fetch courses khi currentPage thay đổi
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await request.get(
          `/courses?page=${currentPage}&limit=${limitPerPage}`
        );
        const { items, meta } = response.data;
        setAllCourses(items);
        setTotalPages(meta.totalPages);
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
  }, [currentPage, navigate]);

  // Khi nhấn nút pagination
  const handlePageClick = (page) => {
    setCurrentPage(page);
    // Page 1 từ pagination vẫn có query
    navigate(`?page=${page}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="homepage grow flex flex-col gap-8 bg-[#e7e8ff]">
      <SearchBar />
      <CourseList allCourses={allCourses} />
      <div className="join pagination mx-auto">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = currentPage === pageNumber;

          return (
            <button
              key={index}
              onClick={() => {
                if (isActive) return; // ignore click if already on this page
                handlePageClick(pageNumber);
              }}
              className={`join-item btn ${isActive ? "btn-active" : ""}`}
              disabled={isActive} 
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
