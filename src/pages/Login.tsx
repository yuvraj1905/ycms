import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useFirebaseProvider } from '../context/Firebase/Firebase';
import toast from 'react-hot-toast';
import { LoginPanel } from '../components/LoginPanel';

const Login: React.FC = () => {
  const firebase = useFirebaseProvider();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const loginResponse: any = await firebase?.logInWithEmailAndPassword(loginCredentials.email, loginCredentials.password);
      if (loginResponse && firebase) {
        firebase?.setData({ ...firebase.data, isLoggedIn: true, user: { ...loginResponse?.user } });
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error: any) {
      const errorMessage = error.message.slice(10) || 'Login Failed';
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSubmitGoogle = async () => {
    setLoggingIn(true);
    try {
      const loginResponse: any = await firebase?.signInWithGoogle();
      if (loginResponse && firebase) {
        firebase?.setData({ ...firebase.data, isLoggedIn: true, user: { ...loginResponse?.user } });
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error: any) {
      const errorMessage = error.message.slice(10) || 'Login Failed';
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoggingIn(false);
    }
  };

  useEffect(() => {
    if (firebase?.data.isLoggedIn) {
      navigate('/');
    }
  }, [firebase, navigate]);

  return (
    <main className="grid grid-rows-1 lg:grid-cols-2 w-full h-screen m-auto bg-background">
      <section className="hidden lg:block max-h-screen rounded-lg bg-[#FBFAF7]">
        <img src='https://www.mysticchordsstudios.com/assets/img/mystic/Music%20and%20Emotions-min.jpg' alt="" className="w-full h-full object-cover" />
      </section>
      <LoginPanel
        loginCredentials={loginCredentials}
        setLoginCredentials={setLoginCredentials}
        handleSubmit={handleSubmit}
        handleSubmitGoogle={handleSubmitGoogle}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loggingIn={loggingIn}
        navigate={navigate}
      />
    </main>
  );
};



export default Login;



