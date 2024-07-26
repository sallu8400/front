import React from "react";
import { Link } from "react-router-dom";

const Failed = () => {
  return (
    <div className="bg-slate-200 h-screen ">
      <div className="space-y-3">
        <img src="/images/failed.svg" className="w-5/12 mx-auto " />
        <div className="flex  flex-col gap-6 justify-center">
          <p className=" text-center font-extrabold text-3xl text-red-600">
            Payment Failed!!
          </p>
          <Link
            to="/"
            className="p-4 w-fit bg-indigo-600 mx-auto text-white hover:bg-rose-500 rounded"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Failed;
