import { Button, Input, Card, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputWrapper } from "../../components/InputWrapper";
import { customerSchema } from "../../utils/validation-schemas";
import * as customerApi from "../../api/customer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useJob } from '../../hooks/useJob';

export default function NewCustomer() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
  });
  const defaultAvatar =
    "https://res.cloudinary.com/dud0qzk5u/image/upload/v1750323999/jobboard/profilePictures/default_photo_cg33aj.jpg";
  const [profilePic, setProfilePic] = useState(defaultAvatar);

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Send data to backend
    try {
      await customerApi.createCustomerAccount({
        ...data,
        profilePicture: profilePic,
      });
      setIsLoading(false);
      toast.success("Your account is created successfully!");
      navigate(`/login`);
    } catch (err) {
      console.error(
        "Creating profile failed: ",
        err.response?.data?.message || err.message
      );
      setIsLoading(false);
      toast.error("Oops something went wrong!");
    }
  };

  return (
    <div className="w-100 flex items-center justify-center">
      <Card
        color="transparent"
        className="w-100 items-center p-12 shadow-2xl"
      >
          <div className="mb-8 flex gap-3 flex-col">
            <Typography
              variant="h1"
              className=" text-2xl font-bold  text-center"
            >
              New Customer Profile
            </Typography>
            <Typography color="gray" className="text-l font-normal text-center">
              Tell us more about yourself
            </Typography>
          </div>
                  <form
          className="mt-8 mb-2 sm:w-96 flex-col justify-evenly gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Profile picture */}
          <div className="flex flex-col items-center justify-center mb-5">
            <img
              id="customerPhoto"
              src={profilePic}
              alt="Profile Picture"
              className="w-44 h-44 rounded-full my-6 object-cover"
            />
          </div>

          {/* Customer information */}
          {/* Email */}
          <InputWrapper error={errors.email}>
            <Typography
              as="label"
              htmlFor="email"
              color="default"
            >
              Email
            </Typography>
            <Input
              id="email"
              size="lg"
              type="text"
              label="Email"
              {...register("email")}
            />
          </InputWrapper>
          {/* username */}
          <InputWrapper error={errors.userName}>
          <Typography
              as="label"
              htmlFor="userName"
              color="default"
            >
              Username
            </Typography>
            <Input
            id="userName"
              size="lg"
              type="text"
              label="Username"
              {...register("userName")}
            />
          </InputWrapper>
          {/* Password */}
          <InputWrapper error={errors.password}>
           <Typography
              as="label"
              htmlFor="password"
              color="default"
            >
              Password
            </Typography>
            <Input
                id="password"
              size="lg"
              type="password"
              label="Password"
              {...register("password")}
            />
          </InputWrapper>
          <Button
            type="submit"
            variant="solid"
            className="mt-8 text-white text-md"
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}
