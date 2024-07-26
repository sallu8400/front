// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./PR.css";

// const PREE = () => {
//   const [show, setshow] = useState(false);
// const [size, setsize] = useState(280);
// const [show, setshow] = useState(true);
// const [mobile, setmobile] = useState(0);

// return (
<>
  {/* <div className="md:block hidden">
        <aside
          className=" bg-indigo-800 h-full top-0 left-0 fixed"
          style={{
            width: size,
            transition: "0.3s",
          }}
        ></aside>

        <section>
          <nav
            className="bg-slate-400 p-4  flex justify-between"
            style={{
              marginLeft: size,
              transition: "0.3s",
            }}
          >
            <button onClick={() => setsize(size === 280 ? 0 : 280)}>
              <i className="ri-logout-box-line"></i>
            </button>

            <div className="">
              <img
                onClick={() => setshow(!show)}
                src="/images/1.jpg"
                className="w-10 h-10 rounded-full relative cursor-pointer"
              />
              {show && (
                <div className="p-3 bg-white absolute right-2 top-16">
                  <h1>Salman</h1>

                  <h1>Salman8400@gail.com</h1>
                  <div className="bg-red-500 h-px" />
                </div>
              )}
            </div>
          </nav>

          <div
            className="bg-slate-600  h-screen"
            style={{
              marginLeft: size,
              transition: "0.3s",
            }}
          >
            <h1 className="text-white">Hello</h1>
          </div>
        </section>
      </div> */}
  {/* for mibile */}
  {/* <div className="md:hidden block">
        <aside
          className=" bg-indigo-800 h-full top-0  z-50 left-0 fixed overflow-hidden "
          style={{
            width: mobile,
            transition: "0.3s",
          }}
        >
          <button
            className="p-4"
            onClick={() => setmobile(mobile === 0 ? 280 : 0)}
          >
            {" "}
            <i className="ri-logout-box-line text-2xl "></i>
          </button>
        </aside>

        <section>
          <nav
            className="bg-slate-400 p-4  sticky   flex justify-between"
            style={{
              transition: "0.3s",
            }}
          >
            <button onClick={() => setmobile(mobile === 0 ? 280 : 0)}>
              <i className="ri-logout-box-line"></i>
            </button>

            <div className="">
              <img
                onClick={() => setshow(!show)}
                src="/images/1.jpg"
                className="w-10 h-10 rounded-full relative cursor-pointer"
              />
              {show && (
                <div className="p-3 bg-white absolute right-2 top-16">
                  <h1>Salman</h1>

                  <h1>Salman8400@gail.com</h1>
                  <div className="bg-red-500 h-px" />
                </div>
              )}
            </div>
          </nav>

          <div
            className="bg-slate-600  h-screen"
            style={{
              marginLeft: mobile,
              transition: "0.3s",
            }}
          >
            <h1 className="text-white">Hello</h1>
          </div>
        </section>
      </div> */}

  {/* <nav className="shadow-lg sticky top-0 left-0 bg-white  p-3 ">
        <div className=" w-10/12 mx-auto  flex justify-between items-center">
          <img src="/images/crop.png" className="w-[70px] h-[40px] " />

          <ul className="flex gap-3 items-center">
            {Menu.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className=" block py-3 hover:bg-blue-500  text-center w-[90px] hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <Link
              to="/login"
              className=" block py-3 hover:bg-rose-600  text-center w-[90px] hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="  bg-blue-500  text-white px-6 py-2  block  font-semibold hover:bg-rose-600  text-center  hover:text-white"
            >
              Signup
            </Link>
          </ul>
        </div>
      </nav> */}

  {/* <div className="flex justify-between items-center bg-red-500">
        <img src="/images/crop.png" className="w-[70px] h-[40px] " />
        <ul className="flex gap-4">
          <i
            className="ri-dashboard-line we"
            onClick={() => setshow(!show)}
          ></i>
          {show && (
            <>
              <li>
                <a href="default.asp">Home</a>
              </li>
              <li>
                <a href="news.asp">News</a>
              </li>
              <li>
                <a href="contact.asp">Contact</a>
              </li>
              <li>
                <a href="about.asp">About</a>
              </li>
            </>
          )}
        </ul>
      </div> */}
  {/* <div className="bg-slate-500 py-16">
        <div className="w-10/12 mx-auto  flex justify-center gap-14 ">
          <img src="/images/crop.png" className="md:w-[100px] md:h-[100px]" />

          <div className="text-left border">
            <h1 className="  text-start text-2xl border font-bold ">
              . Lorem Ipsum has been the industry'ss
              <br /> standard dummy <br />a typtext ever type and scrambled it
              to make a typ
            </h1>
            <h2>salman shaikh</h2>
          </div>

          <img
            src="/images/crop.png"
            className="md:w-[100px] md:h-[100px] mt-10"
          />
        </div>
      </div> */}
</>;
//   );
// };

// export default PREE;
// import { useState } from "react";

// const PREE = () => {
// const model = {
//   firstname: "",

//   lastname: "",

//   email: "",

//   password: "",

//   username: "",

//   mobile: "",
// };

//   const [form, setForm] = useState(null);

//   const getFormValue = (e) => {
//     const input = e.target;

//     const value = input.value;

//     const key = input.name;

//     setForm({
//       ...form,

//       [key]: value,
//     });
//   };

//   const signup = (e) => {
//     e.preventDefault();

//     console.log(form);
//   };

//   return (
//     <div className="bg-gray-100 h-screen flex justify-center items-center">
//       <div className="bg-white px-8 py-6 w-[450px] shadow-lg rounded-lg animate__animated animate__zoomIn">
//         <h1 className="text-2xl font-bold mb-4 text-center">
//           CodingOtt Signup Form
//         </h1>

//         <form className="flex flex-col gap-4" onSubmit={signup}>
//           <div className="flex flex-col gap-1">
//             <label className="text-lg font-semibold">Firstname</label>

//             <input
//               name="firstname"
//               type="text"
//               placeholder="Enter first name here"
//               className="border p-2 rounded border-gray-300"
//               onChange={getFormValue}
//             />

//             {/* <small className='text-rose-600 font-semibold text-sm'>This field is required</small> */}
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-lg font-semibold">Lastname</label>

//             <input
//               name="lastname"
//               type="text"
//               placeholder="Enter last name here"
//               className="border p-2 rounded border-gray-300"
//               onChange={getFormValue}
//             />

//             {/* <small className='text-rose-600 font-semibold text-sm'>This field is required</small> */}
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-lg font-semibold">Email</label>

//             <input
//               name="email"
//               type="email"
//               placeholder="email@gmail.com"
//               className="border p-2 rounded border-gray-300"
//               onChange={getFormValue}
//             />

//             {/* <small className='text-rose-600 font-semibold text-sm'>This field is required</small> */}
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-lg font-semibold">Password</label>

//             <input
//               name="password"
//               type="password"
//               placeholder="*************"
//               className="border p-2 rounded border-gray-300"
//               onChange={getFormValue}
//             />

//             {/* <small className='text-rose-600 font-semibold text-sm'>This field is required</small> */}
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-lg font-semibold">Username</label>

//             <input
//               name="username"
//               type="text"
//               placeholder="@Username"
//               className="border p-2 rounded border-gray-300"
//               onChange={getFormValue}
//             />

//             {/* <small className='text-rose-600 font-semibold text-sm'>This field is required</small> */}
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-lg font-semibold">Mobile no</label>

//             <input
//               name="mobile"
//               type="number"
//               placeholder="9472395194"
//               className="border p-2 rounded border-gray-300"
//               onChange={getFormValue}
//             />

//             {/* <small className='text-rose-600 font-semibold text-sm'>This field is required</small> */}
//           </div>

//           <button className="border-0 bg-indigo-600 text-white rounded py-2 font-semibold">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PREE;

// import React, { useState } from "react";

// const PREE = () => {
//   const [passwordType, setPasswordtye] = useState("password");
//   return (
//     <div>
//       <h1>dfghjkl</h1>

//       <form>
//         <div className="relative w-fit">
//           <input
//             type={passwordType}
//             className="border"
//             name="salman"
//             autoComplete="off"
//             required
//           />
//           <button
//             type="button"
//             className=" absolute right-2 left-26"
//             onClick={() =>
//               setPasswordtye(passwordType === "password" ? "text" : "password")
//             }
//           >
//             {passwordType === "password" ? (
//               <i className="ri-eye-line"></i>
//             ) : (
//               <i class="ri-eye-off-line"></i>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PREE;

import React from "react";
import { Link } from "react-router-dom";

const PREE = () => {
  return (
    <div className="w-11/12 py-6 bg-slate-300 mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">Mca Reader</h1>

      <ul className="flex gap-4">
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li></li>
      </ul>
    </div>
  );
};

export default PREE;
