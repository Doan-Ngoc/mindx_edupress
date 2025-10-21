import CourseList from "../../components/CourseList/CourseList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import Loading from "../../components/Loading";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foundCourses, setFoundCourses] = useState([]);
  const limitPerPage = 2;

  // Lấy search term và page từ URL khi load
  useEffect(() => {
    const termFromUrl = searchParams.get("q")?.replace(/-/g, " ") || "";
    setSearchTerm(termFromUrl);
    setCurrentPage(
      searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
    );
  }, [location.search]);

  // Fetch courses khi searchTerm hoặc currentPage thay đổi
  useEffect(() => {
    if (!searchTerm) return;
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await request.get(
          `/courses?search=${searchTerm}&page=${currentPage}&limit=${limitPerPage}`
        );
        const { items, meta } = response.data;
        setFoundCourses(items);
        setTotalPages(meta.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        navigate("/error/500");
      }
    };
    fetchCourses();
  }, [searchTerm, currentPage]);

  // Khi nhấn nút pagination
  const handlePageClick = (page) => {
    searchParams.set("page", page);
    navigate(`/courses/search?${searchParams.toString()}`);
  };

  return (
    <div className="homepage grow flex flex-col gap-8 bg-[#e7e8ff]">
      <SearchBar />
      {isLoading ? (
        <Loading />
      ) : foundCourses.length === 0 ? (
        <div className="text-center text-xl mt-16">
          No courses found matching your search.
        </div>
      ) : (
        <>
          <CourseList allCourses={foundCourses} />
          {totalPages > 1 && (
            <div className="join pagination mx-auto">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = currentPage === pageNumber;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (isActive) return; 
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
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
