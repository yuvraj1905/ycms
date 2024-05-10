import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface SignupPanelProps {
    loginCredentials: { email: string; password: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    loggingIn: boolean;
    navigate: ReturnType<typeof useNavigate>;
  }
  
export const SignupPanel: React.FC<SignupPanelProps> = ({
    loginCredentials,
    handleInputChange,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
    loggingIn,
    navigate,
  }) => {
    return (
      <div className="flex items-center justify-center w-full px-5">
        <section className="px-7 py-10 rounded-md shadow-md bg-white/[0.8] flex flex-col gap-6 w-full max-w-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Sign Up</h1>
            <form action="" className="flex flex-col gap-3 " onSubmit={handleSubmit}>
              <label className="flex flex-col items-start">
                Email
                <input
                  type="email"
                  className="border rounded-md p-1.5 shadow-sm w-full"
                  value={loginCredentials.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                />
              </label>
              <label className="flex flex-col items-start">
                Password
                <span className="relative w-full flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="border rounded-md p-1.5 shadow-sm w-full "
                    value={loginCredentials.password}
                    onChange={(e) => handleInputChange(e, 'password')}
                  />
                  {!showPassword ? (
                    <FaRegEye onClick={togglePasswordVisibility} className="absolute right-4 cursor-pointer" />
                  ) : (
                    <FaRegEyeSlash onClick={togglePasswordVisibility} className="absolute right-4 cursor-pointer" />
                  )}
                </span>
              </label>
              <div className="w-full py-2 flex flex-col gap-4 items-center ">
                <button
                  className="btn-primary cursor-pointer w-2/3 text-lg text-center bg-[#878B91] p-2 rounded-md text-white hover:bg-slate-600"
                  disabled={loggingIn || !loginCredentials.email || !loginCredentials.password}
                >
                  {loggingIn ? 'Signing Up...' : 'Signup'}
                </button>
                <Link to="/login" className="underline text-gray-600">
                  Login to existing account
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  };
  
  