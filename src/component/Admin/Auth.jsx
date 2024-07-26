import React from "react";

const Auth = () => {
  return (
    <>
      <div className="bg-gray-400 h-screen  flex items-center justify-center">
        <img src="/images/2.svg" className="w-96 h-96" />

        <div className="flex flex-col gap-y-10">
          <h2 className="font-extrabold text-4xl">Admin Proceed!!</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              className=" border p-4 w-[350px] hover:bg-white-300  rounded-md focus:outline-none"
              placeholder="Admin Secret"
              required
            />
            <button className="p-3 px-6 bg-indigo-800 w-fit rounded-md text-white">
              Access Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
