import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Input, Button, Typography} from '@material-tailwind/react';
import { userSigninSchema } from '../utils/validation-schemas';
import { InputWrapper } from '../components/InputWrapper';
import * as authApi from '../api/authenticate';
import { useAuth } from '../hooks/useAuth';
import { AlreadyLogin } from './errors/AlreadyLogin';

const userSigninDefaultValues = {
  email: '',
  password: '',
};

export default function Login() {
  const { isLoggedIn, setAccessToken } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: userSigninDefaultValues,
    resolver: yupResolver(userSigninSchema),
    mode: 'onSubmit',
  });
  const navigate = useNavigate();

  //Log in request
  const onSubmit = async (data) => {
    try {
      const response = await authApi.signin(data);
      setAccessToken(response.data.accessToken);
      toast.success('Successfully logged in');
      navigate('/');
    } catch (err) {
      if (err.response.data.field) {
        const { field, message } = err.response.data;
        setError(field, {
          type: 'server response',
          message,
        });
      } else {
        toast.error('Opps! Login failed. Please try again.');
      }
    }
  };
  //If accessed when already logged in
  if (isLoggedIn) {
    return <AlreadyLogin />;
  }

  return (
    <div className="w-full h-full shadow-2xl rounded-md flex flex-col items-center justify-center gap-20">
      {/* Sign in form */}
      <h2 className="text-2xl font-bold">Sign in to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-1/3">
        <div className="mt-8 mb-8 flex flex-col gap-6">
          <InputWrapper error={errors.email}>
          <Typography as="label" htmlFor="email">
            Email
          </Typography>
            <Input
              id="email"
              type="email"
              size="lg"
              className={errors.email && 'outline-red-500'}
              error={errors.email}
              {...register('email')}
            />
          </InputWrapper>
          <InputWrapper error={errors.password}>
          <Typography as="label" htmlFor="password">
            Password
          </Typography>
            <Input
              id="password"
              type="password"
              size="lg"
              error={errors.password}
              {...register('password')}
            />
          </InputWrapper>
        </div>
        <Button
          type="submit"
          className="text-black text-sm bg-[#ffce00]"
        >
          Sign In
        </Button>

        {/* Link to sign up page */}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Do not have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600">
            Sign Up
          </Link>
        </Typography>
      </form>
    </div>
  );
}
