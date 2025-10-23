import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlreadyLogin } from "../errors/AlreadyLogin";
import { useAuth } from "../../hooks/useAuth";

export function Signup() {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  //If accessed when already logged in
  if (isLoggedIn) {
    return <AlreadyLogin />;
  }

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col gap-4 items-center justify-center ">
      {/* Sign up form */}
      <h2 className="text-2xl font-bold">Create an account</h2>
      <Typography variant="h3" className="text-l font-bold" color="blue-gray">
        Choose your role:
      </Typography>
      <form className=" w-1/3">
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="role"
              value="customer"
              checked={selectedRole === "customer"}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <div>
              <Typography className="font-medium text-gray-900">
                Learner/Customer
              </Typography>
              <Typography variant="small" color="gray">
                I want to browse and enroll in courses
              </Typography>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="role"
              value="provider"
              checked={selectedRole === "provider"}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <div>
              <Typography className="font-medium text-gray-900">
                Course Provider
              </Typography>
              <Typography variant="small" color="gray">
                I want to create and sell courses
              </Typography>
            </div>
          </label>
        </div>
        <Button
          type="button"
          variant="solid"
          className="mt-8 text-white text-md"
          disabled={!selectedRole}
          onClick={() => navigate(`/signup/${selectedRole}`)}
        >
          Continue
        </Button>

        {/* Link to log in page */}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/login" href="#" className="font-medium text-blue-600">
            Sign In
          </Link>
        </Typography>
      </form>
    </div>
  );
}
