import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface LoginPanelProps {
    loginCredentials: { email: string; password: string };
    setLoginCredentials: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleSubmitGoogle: () => Promise<void>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    loggingIn: boolean;
    navigate: ReturnType<typeof useNavigate>;
  }
  
  export const LoginPanel: React.FC<LoginPanelProps> = ({
    loginCredentials,
    setLoginCredentials,
    handleSubmit,
    handleSubmitGoogle,
    showPassword,
    setShowPassword,
    loggingIn,
    navigate,
  }) => {
    return (
      <div className="flex items-center justify-center w-full px-5 ">
        <section className="loginForm px-7 py-10 rounded-xl shadow-md bg-white/[0.8] flex flex-col gap-6 w-full max-w-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3 ">Login</h1>
            <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
              <label className="flex flex-col items-start">
                Email
                <input
                  type="email"
                  className="border rounded-md p-1.5 shadow-sm w-full"
                  value={loginCredentials.email}
                  onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                />
              </label>
              <label className="flex flex-col items-start">
                Password
                <span className='relative w-full flex items-center'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="border rounded-md p-1.5 shadow-sm w-full "
                    value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                  />
                  {showPassword ? (
                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className='absolute right-4 cursor-pointer'/>
                  ) : (
                    <FaRegEye onClick={() => setShowPassword(!showPassword)} className='absolute right-4 cursor-pointer'/>
                  )}
                </span>
              </label>
              <div className="w-full py-2 flex flex-col gap-4 items-center ">
                <button
                  className="btn-primary cursor-pointer w-2/3 text-lg text-center bg-[#878B91] p-2 rounded-md text-white hover:bg-slate-600"
                  disabled={loggingIn}
                >
                  {loggingIn ? 'Logging In...' : 'Login'}
                </button>
                <Link to="/signup" className="underline text-gray-600">
                  Create New Account
                </Link>
                <p className='text-center'>Or</p>
                <button onClick={handleSubmitGoogle} className="cursor-pointer w-2/3 bg-[#4081ED] text-white p-0 m-0">
                  <span className='flex bg-[#4081ED] justify-between items-center p-0 m-0 border h-12 relative'>
                    <span className='bg-white w-1/5 border relative h-[95%] ml-[1px]'>
                        <img className='w-full h-full object-contain p-1 bg-white' src="data:image/png;base64,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" alt="" />
                    </span>
                    <p className='w-4/5 py-2'>Sign in with Google</p>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  };