import { Input, Typography, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as courseApi from "../../api/course";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputWrapper } from "../../components/InputWrapper";
import { createCourseSchema } from "../../utils/validation-schemas";

const CreateCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCourseSchema),
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const defaultThumbnail =
    "https://res.cloudinary.com/dud0qzk5u/image/upload/v1750323999/jobboard/profilePictures/default_photo_cg33aj.jpg";

  //Submit form
  const handleFormSubmit = async (data) => {
    try {
      //Submit course
      const response = await courseApi.createCourse({
        ...data,
        thumbnail: defaultThumbnail,
      });
      toast.success("Course created successfully!");
      //Navigate to course
      navigate(`/course/${response.data.id}`);
    } catch (error) {
      console.error(
        "Creating course failed:",
        error.response?.data?.message || error.message
      );
      toast.error("Oops something went wrong!");
    }
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <Typography variant="h1" className="text-2xl font-bold">
          Create New Course
        </Typography>
        <form
          className="mt-8 mb-2 w-5/6 max-w-screen-lg mx-auto text-lg"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6 w-100 text-lg">
            {/* Course Title */}
            <InputWrapper error={errors.title}>
              <Typography
                as="label"
                htmlFor="title"
                variant="h6"
                color="blue-gray"
                className="mb-3 text-lg "
              >
                Title
              </Typography>
              <Input
                id="title"
                size="lg"
                className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                required
                {...register("title")}
                error={errors.title}
              />
            </InputWrapper>

            {/* Course Price */}
            <InputWrapper error={errors.price}>
              <Typography
                as="label"
                htmlFor="price"
                variant="h6"
                color="blue-gray"
                className="mb-3 text-lg"
              >
                Course Price (in VND)
              </Typography>
              <Input
                id="price"
                size="lg"
                className="text-xl bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                required
                {...register("price")}
                error={errors.price}
              />
            </InputWrapper>

            {/* Course description */}
            <InputWrapper error={errors.description}>
              <Typography
                as="label"
                htmlFor="description"
                variant="h6"
                color="blue-gray"
                className="mb-3 text-lg"
              >
                Course Description
              </Typography>
              <textarea
                id="description"
                rows={8}
                className="text-xl bg-white h-full min-h-[100px] w-full resize-none rounded-[7px] border
             px-3 py-2  transition-all !border-t-blue-gray-200 focus:!border-t-gray-900"
                placeholder=" "
                {...register("description")}
                error={errors.description}
              ></textarea>
            </InputWrapper>
          </div>

          {/* Submit button */}
          <Button
            className="btn mt-10 mx-auto text-white  font-medium w-1/3"
            type="submit"
            variant="solid"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateCourse;
