import React, { useContext } from 'react';
import { useFirebaseProvider } from '../context/Firebase/Firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const Profile: React.FC = () => {
  const firebase = useFirebaseProvider();
  const navigate=useNavigate()
  const loginLogoutHandler=async()=>{
    if(firebase){
      try{
        const res=await firebase?.logout();
        toast.success('Logout successful !')
        navigate('/login')
      }catch(e){
        toast.error('An error occured.')
      }
    }
    
  }
  return (<>
  <Navbar/>
    <div className="flex flex-col items-center pt-24">
      <div className="bg-white rounded-full h-40 w-40 flex items-center justify-center mb-4">
        <img src={firebase?.data?.user?.photoURL?firebase?.data?.user?.photoURL:'https://png.pngtree.com/png-clipart/20190924/original/pngtree-boy-user-avatar-vector-icon-free-png-image_4827808.jpg'} alt="User Avatar" className="rounded-full h-36 w-36 object-cover" />
      </div>
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold">{firebase?.data.user.displayName||'Guest user'}</h2>
        <p className="text-gray-600">{firebase?.data.user.email}</p>
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={loginLogoutHandler}
        >
        Logout
      </button>
    </div>
        </>
  );
};

export default Profile;
