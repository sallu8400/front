import React from "react";
import Layout from "./Layout";

const Contact = () => {
  return (
    <>
      <Layout>
        <div className="md:w-6/12 mx-auto pb-3  animate__animated  animate__fadeIn ">
          <img
            src="/images/5138237.jpg"
            className="md:w-[500px] md:h-[350px]  "
          />
          <div>
            <form className=" shadow-lg    md:pl-0 pl-6 ">
              <div className=" flex flex-col gap-2 w-10/12 ">
                <label className="text-lg font-semibold ">Full Name</label>
                <input
                  required
                  type="text"
                  name="fullname"
                  placeholder="Enter the name"
                  className="p-3  border border-gray-300 rounded "
                />
                <div className=" flex flex-col gap-2 ">
                  <label className="text-lg font-semibold"> Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter the email"
                    className="p-3 border border-gray-300 rounded "
                  />
                </div>

                <textarea
                  className="border"
                  required
                  name="message"
                  type="text"
                  placeholder="message"
                  rows={4}
                />

                <button className="px-4 py-3 rounded bg-blue-600 text-white font-bold w-24  hover:bg-rose-600">
                  Quaote
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
