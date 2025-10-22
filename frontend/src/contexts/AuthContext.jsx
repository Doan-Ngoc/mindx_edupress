import { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/authenticate';
import { request, setUpdateAccessToken } from '../utils/request';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState();
  const [userId, setUserId] = useState();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setUpdateAccessToken(setAccessToken);
  }, []);

  // 🟩 THÊM MỚI: khởi tạo access token khi app load lại
  useEffect(() => {
    const initAuth = async () => {
      try {
        // gọi API refresh dựa trên cookie (withCredentials: true)
        const res = await authApi.refreshAccessToken();
        const newToken = res.data.accessToken;
        if (newToken) {
          setAccessToken(newToken);
          console.log("Token refreshed on startup");
        }
      } catch (err) {
        console.log("No valid refresh token or refresh failed");
        setAccessToken(null);
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
        console.log('Checking login status with access token:', accessToken);
      setLoadingAuth(true);
      try {
        //Try reissue the access token if the user has a valid refresh token
        if (!accessToken) {
          setIsLoggedIn(false);
          setUserRole('');
          setUserId('');
          delete request.defaults.headers.common['Authorization'];
        } else {
          //Verify access token if it's available
          const response = await authApi.verifyAccessToken(accessToken);
          setUserRole(response.data.role);
          setUserId(response.data.id);
          setIsLoggedIn(true);
          request.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          console.log('User is logged in', response.data);
        }
      } catch (error) {
        console.error(
          'Auth initialization failed:',
          error.response?.data?.message || error.message,
        );
        // handleLogout();
      }
      setLoadingAuth(false);
    };
    checkLoginStatus();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        loadingAuth,
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        userId,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



  