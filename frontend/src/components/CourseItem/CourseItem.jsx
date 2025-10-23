import { Link } from "react-router-dom";

const CourseItem = (props) => {
  const { courseData } = props;
  return (
    <article className="h-36 flex gap-12 py-4 px-10 rounded-xl shadow-md bg-[#fff] text-lg">
      <div className="w-24 h-24 bg-white avatar">
        <div className="w-24 h-24 rounded-lg">
          <img
            src={
              courseData.thumbnail
                ? courseData.thumbnail
                : "https://res.cloudinary.com/dud0qzk5u/image/upload/v1750323999/jobboard/profilePictures/default_photo_cg33aj.jpg"
            }
            alt="Course Thumbnail"
            className="w-44 h-44 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1 text-left">
        <Link to={`/course/${courseData.id}`}>
          <p className="text-xl font-bold">{courseData.title}</p>
        </Link>

        <div className="flex job-item-details gap-8">
          <div className="flex-1 text-left flex flex-col gap-1 py-auto py-3">
            <Link to={`/provider/${courseData.createdBy.id}`}>
              <p className="font-semibold">
                {courseData.createdBy.displayedName}
              </p>
            </Link>
          </div>

          <div className="flex-1 text-left flex flex-col gap-1 py-auto py-3">
            <p>Price: {courseData.price}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CourseItem;
