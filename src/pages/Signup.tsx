import React, { useState } from 'react';
import { useFirebaseProvider } from '../context/Firebase/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { SignupPanel } from '../components/SignupPanel';

const Signup: React.FC = () => {
  const firebase = useFirebaseProvider();
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginCredentials.email || !loginCredentials.password) {
      toast.error('Please fill all fields to continue.');
      return;
    }
    setLoggingIn(true);
    try {
      const signupResponse: any = await firebase?.signUpWithEmailPassword(
        loginCredentials.email,
        loginCredentials.password
      );
      if (signupResponse && firebase) {
        firebase?.setData({ ...firebase.data, isLoggedIn: true, user: { ...signupResponse?.user } });
        toast.success('Signup successful!');
        navigate('/');
      }
    } catch (error: any) {
      const errorMessage = error.message.slice(10) || 'Signup failed';
      toast.error(errorMessage);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setLoginCredentials({
      ...loginCredentials,
      [field]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="grid grid-rows-1 lg:grid-cols-2 w-full h-screen m-auto bg-background">
      <section className="hidden lg:block max-h-screen rounded-lg">
        <img src="https://www.mysticchordsstudios.com/assets/img/mystic/Music%20and%20Emotions-min.jpg" alt="" className="w-full h-full object-cover" />
      </section>
      <SignupPanel
        loginCredentials={loginCredentials}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        loggingIn={loggingIn}
        navigate={navigate}
      />
    </main>
  );
};

export default Signup;
