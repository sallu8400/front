import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FirebasesApp from "../firebase-config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth(FirebasesApp);

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setpasswordType] = useState("password");
  const [Eror, setEror] = useState(null);
  const [loader, setLoader] = useState(false);
  const [Formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const Login = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      await signInWithEmailAndPassword(
        auth,
        Formdata.email,

        Formdata.password
      );
      navigate("/");
    } catch (error) {
      setLoader(true);
      setEror(error.message);
    } finally {
      setLoader(false);
    }
  };

  const handlehangee = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setFormdata({
      ...Formdata,
      [name]: value,
    });
    setEror(null);
  };
  return (
    <>
      <div className="  grid md:grid-cols-2    md:mt-[80px]  animate__animated animate__fadeIn">
        <img src="/images/signup.jpg" className="md:w-[600px] md:h-[550px]" />
        <div className="flex flex-col gap-2 md:pl-0 pl-12 md:mt-12    ">
          <h1 className="text-3xl  font-semibold ">Login Here </h1>
          <p className="text-lg   text-gray-600">Login To start shopping</p>
          <form className="md:mt-4  " onSubmit={Login}>
            <div className=" flex flex-col gap-2 w-10/12 ">
              <div className=" flex flex-col gap-2 ">
                <label className="text-lg font-semibold"> Email</label>
                <input
                  required
                  onChange={handlehangee}
                  type="email"
                  name="email"
                  placeholder="Enter the email"
                  className="p-3 border border-gray-300 rounded "
                />
              </div>
              <div className=" flex flex-col relative ">
                <label className="text-lg font-semibold">password</label>
                <input
                  type={passwordType}
                  onChange={handlehangee}
                  name="password"
                  placeholder="*******"
                  className="p-3 border border-gray-300 rounded "
                />
                <button
                  onClick={() =>
                    setpasswordType(
                      passwordType === "password" ? "text" : "password"
                    )
                  }
                  type="button"
                  className="absolute top-10 right-4 bg-blue-200 h-8 w-8 rounded-full hover:text-blue-500"
                >
                  {passwordType === "password" ? (
                    <i className="ri-eye-line "></i>
                  ) : (
                    <i className="ri-eye-off-line  "></i>
                  )}
                </button>
              </div>

              {loader ? (
                <div className="bg-slate-200 h-full fixed top-0 left-0 w-full flex justify-center items-center">
                  <div role="status ">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <button className="px-4 py-3 rounded bg-blue-600 text-white font-bold w-24  hover:bg-rose-600">
                  Login
                </button>
              )}
            </div>
          </form>

          <div className="mt-2 text-1xl">
            Dont't Have Account
            <Link to="/Signup" className="text-blue-500  font-medium pl-2">
              Register?
            </Link>
            {Eror && (
              <div className="flex justify-between amimate__animated animate_pulse bg-red-600 w-10/12  p-2 mt-2 rounded text-1xl font-bold">
                <p>invalid Credentials!!</p>
                <i
                  className="ri-close-line text-white cursor-pointer"
                  onClick={() => setEror(null)}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
