import CourseItem from "../CourseItem/CourseItem";

const CourseList = ({ allCourses }) => {
  return (
    <div className="jobList my-8 grow flex flex-col gap-8">
      {allCourses &&
        allCourses.map((courseData) => (
          <CourseItem courseData={courseData} key={courseData.id} />
        ))}
    </div>
  );
};

export default CourseList;
