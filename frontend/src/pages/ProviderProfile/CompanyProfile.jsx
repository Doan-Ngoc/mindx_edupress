import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as providerApi from '../../api/provider';
import './ProviderProfile.css';
import Loading from '../../components/Loading';

const ProviderProfile = ({ accountId }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const { userId } = useParams();

  useEffect(() => {
    //Fetch profile data
    const fetchProfile = async () => {
      try {
        const res = await providerApi.getProviderProfile(userId);
        setProfile(res.data);
      } catch (err) {
        console.log(
          'Error fetching provider profile:',
          err.response?.data?.message || err.message,
        );
        navigate('/error/500');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, navigate]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="company-profile grow flex flex-col items-center justify-center">
        <header
          className="hero rounded-md"
          style={{ backgroundColor: 'var(--slate-color)' }}
        >
          <div className="hero-content w-full p-8 flex items-center justify-center gap-24 ">
            <div className="company-logo w-1/4 ">
              <img
                src={
                  profile.profilePicture
                    ? `${profile.profilePicture}`
                    : 'https://res.cloudinary.com/dud0qzk5u/image/upload/v1750323999/jobboard/profilePictures/default_photo_cg33aj.jpg'
                }
                className="w-44 h-44 rounded-full mx-auto object-cover"
                alt="Provider's Profile Picture"
              />
            </div>
            <div className="w-3/4">
              <h1 className="text-2xl font-bold py-6 text-left pl-4">
                {profile.displayedName}
              </h1>
            </div>
          </div>
        </header>

        <main
          className="w-full bg-white rounded-md px-32 py-20 text-justify text-lg"
          style={{ whiteSpace: 'pre-line' }}
        >
          {profile.description}
        </main>
      </div>
    </>
  );
};

export default ProviderProfile;
