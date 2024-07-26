import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import FirebasesApp from "../firebase-config";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
const auth = getAuth(FirebasesApp);
const db = getFirestore(FirebasesApp);
const Layout = ({ children, update, decrementUi }) => {
  const [sidenav, setsidenav] = useState(false);
  const [session, setsession] = useState(null);
  const [Open, SetOpen] = useState(false);
  const [cartcount, setcartcount] = useState(0);
  const [isadmin, setisadmin] = useState(null);

  const [Login, setLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setsession(user);
      } else {
        setsession(false);
      }
    });
  }, []);
  console.log(session, "layout");

  const Menu = [
    {
      label: "Home",
      link: "/",
      icon: "ri-home-4-fill text-2xl  mr-3",
    },
    {
      label: "Products",
      link: "/products",
      icon: "ri-shopping-cart-fill text-2xl mr-[6px]",
    },
    {
      label: "Category",
      link: "/category",
      icon: "ri-menu-search-line text-2xl  mr-[6px] ",
    },
    {
      label: "ConatactUs",
      link: "/contact-us",
      icon: "ri-contacts-fill text-2xl -mr-0 ",
    },
  ];

  useEffect(() => {
    if (session) {
      const req = async () => {
        const col = collection(db, "Cart");
        const q = query(col, where("Userid", "==", session.uid));
        const snapshort = await getDocs(q);
        setcartcount(snapshort.size);
      };
      req();
    }
  }, [update, session, decrementUi]);

  useEffect(() => {
    const req = async () => {
      if (session) {
        const col = collection(db, "customers");
        const q = query(col, where("userId", "==", session.uid));
        const snapshort = await getDocs(q);
        let role = null;
        snapshort.forEach((doc) => {
          const item = doc.data();
          role = item.role;
        });

        if (role == "admin") {
          setisadmin(true);
        } else {
          setisadmin(false);
        }
      }
    };
    req();
  }, [session]);

  if (session === null)
    return (
      <div className="bg-slate-200 h-full fixed top-0 left-0 w-full flex justify-center items-center">
        <div role="status ">
          <svg
            aria-hidden="true"
            className=" w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    );

  return (
    <>
      <div className="md:block hidden">
        <nav className="shadow-lg sticky z-50 top-0 left-0 bg-white  p-3 ">
          <div className="flex-row md:w-10/12 w-11/12 mx-auto  flex justify-between items-center">
            <img src="/images/crop.png" className="  md:w-[70px] w-[40px] " />

            <ul className=" md:flex gap-3 items-center hidden">
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
              {/* if user is not login */}
              {!session && (
                <>
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
                </>
              )}
              {session && cartcount > 0 && (
                <Link to="/cart" className="relative px-2 mr-2">
                  <i className="ri-shopping-cart-line text-2xl font-light"></i>

                  <p className=" text-white text-xs absolute -top-3 -right-2 bg-rose-500 rounded-full px-2 py-1">
                    {cartcount}
                  </p>
                </Link>
              )}
              {/* if user is  login */}
              {session && (
                <button className="relative" onClick={() => SetOpen(!Open)}>
                  <img
                    src={session.photoURL ? session.photoURL : "/images/1.jpg"}
                    className="w-12 h-12 rounded-full ml-2 object-cover"
                  />
                  {Open && (
                    <div className="  flex flex-col py-3 items-start animate__animated animate__pulse w-[150px] bg-white absolute right-0 top-12 shadow-xl">
                      {isadmin && (
                        <Link
                          to="/admin/dashboard"
                          className="font-medium  hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-user-line mr-2"></i>Admin
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        className=" font-medium hover:bg-gray-100 w-full text-left p-2"
                      >
                        <i className="ri-user-line mr-2"></i>my Profile
                      </Link>
                      <Link
                        to="/cart"
                        className="hover:bg-gray-100  font-medium w-full text-left p-2"
                      >
                        <i className="ri-shopping-cart-fill mr-2"></i>Cart
                      </Link>

                      <Link
                        onClick={() => signOut(auth)}
                        className=" font-medium hover:bg-gray-100 w-full text-left p-2"
                      >
                        <i className=" ri-logout-circle-r-line mr-2"></i>
                        Logout
                      </Link>
                    </div>
                  )}
                </button>
              )}
            </ul>

            <button className="md:hidden" onClick={() => setsidenav(!sidenav)}>
              <i className="ri-dashboard-line  text-2xl "></i>
            </button>

            <aside
              className="  md:hidden overflow-hidden h-full   bg-slate-300 fixed top-0 left-0  "
              style={{
                width: sidenav ? 280 : 0,
                transition: "0.3s",
              }}
            >
              <div className="flex flex-col gap-0 items-center ">
                {session && (
                  <button
                    className="relative flex flex-col items-center"
                    onClick={() => SetOpen(!Open)}
                  >
                    <img
                      src={
                        session.photoURL ? session.photoURL : "/images/1.jpg"
                      }
                      className="w-12 h-12 rounded-full ml-2 object-cover mt-3 text-center"
                    />
                    <div className="flex flex-col">
                      <p className=" text-white font-extrabold">
                        {session.displayName}
                      </p>
                      <p className="font-medium text-white">{session.email}</p>
                    </div>
                    {Open && (
                      <div className="  flex flex-col py-3 items-start animate__animated animate__pulse w-[150px] bg-white absolute right-0 top-12 shadow-xl">
                        <Link
                          to="/profile"
                          className="hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-user-line mr-2"></i>my Profile
                        </Link>
                        <Link
                          to="/cart"
                          className="hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-shopping-cart-fill mr-2"></i>Cart
                        </Link>

                        <Link
                          onClick={() => signOut(auth)}
                          className="hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-logout-circle-r-line mr-2"></i>Logout
                        </Link>
                      </div>
                    )}
                  </button>
                )}

                {Menu.map((item, index) => (
                  <Link
                    className=" hover:bg-rose-600 w-full text-center p-3 font-bold"
                    key={index}
                    style={{
                      background:
                        location.pathname === item.link
                          ? "#E11D48"
                          : "transparent",

                      text: location.pathname === item.link ? "white" : "",
                    }}
                    to={item.link}
                  >
                    {item.label}
                  </Link>
                ))}
                {session ? (
                  <Link
                    to="/"
                    className="w-full text-center text-2xl p-3 hover:bg-rose-800 hover:text-white font-extrabold"
                    onClick={() => signOut(auth)}
                  >
                    LogOut
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full text-center text-2xl p-3 hover:bg-rose-800 hover:text-white font-extrabold"
                  >
                    LogIn
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </nav>
        <div>{children}</div>
        <footer className="bg-orange-600 ">
          <div className="w-10/12 mx-auto grid md:grid-cols-4  md:gap-8  gap-2">
            <div className="md:py-10 ">
              <h1 className="font-bold my-2 text-white"> websites Links</h1>

              <ul className="space-y-3">
                <li>
                  {" "}
                  <Link to="/">
                    {" "}
                    <i class="ri-facebook-circle-fill mr-2"></i>Facebook
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i class="ri-telegram-fill mr-2"></i>Instagram
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i class="ri-instagram-line mr-2"></i>Telegram
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i className="ri-twitter-x-line mr-2"></i>Twitter
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i className="ri-youtube-line mr-2"></i>Youtube
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:py-10 space-y-7 ">
              <h1 className="font-bold my-2 text-white">Brannd Details</h1>
              <p className="text-gray-200 text-start ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum
              </p>
              <img src="/images/crop.png" className="w-[70px] h-[50px] mt-3" />
            </div>
            <div className=" md:py-10">
              <h1 className="font-bold my-2 text-white"> websites Links</h1>

              <ul className="space-y-3">
                {Menu.map((item, index) => (
                  <li key={index} className="mb-2 ">
                    <Link to={item.link}>{item.label}</Link>
                  </li>
                ))}

                <li>
                  {" "}
                  <Link to="/login">session</Link>
                </li>
                <li>
                  <Link to="/signup">sign up</Link>
                </li>
              </ul>
            </div>

            <div className="md:py-10">
              <h1 className="font-bold my-2 text-white"> Contact Us</h1>
              <form className="space-y-4">
                <input
                  type="text"
                  className="p-2 w-full rounded"
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="p-2 w-full rounded"
                  placeholder="Enter Email id"
                  required
                />
                <textarea
                  name="message "
                  required
                  placeholder="Message"
                  className="p-2 w-full rounded"
                  rows={3}
                />
                <button className="bg-black py-3 px-6 text-white">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </footer>
      </div>
      {/* //mobile */}
      <div className="md:hidden ">
        <nav className="shadow-lg sticky z-50 top-0 left-0 bg-white  p-3 ">
          <div className="flex-row md:w-10/12 w-11/12 mx-auto  flex justify-between items-center">
            <img src="/images/crop.png" className="  md:w-[70px] w-[40px] " />

            <ul className=" md:flex gap-3 items-center hidden">
              {Menu.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className=" block py-3 hover:bg-blue-500  text-center w-[90px] hover:text-white"
                  >
                    <div>{item.label}</div>
                  </Link>
                </li>
              ))}
              {/* if user is not login */}
              {!session && (
                <>
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
                </>
              )}
              {session && cartcount > 0 && (
                <Link to="/cart" className="relative px-2 mr-2">
                  <i className="ri-shopping-cart-line text-2xl font-light"></i>

                  <p className=" text-white text-xs absolute -top-3 -right-2 bg-rose-500 rounded-full px-2 py-1">
                    {cartcount}
                  </p>
                </Link>
              )}
              {/* if user is  login */}
              {session && (
                <button className="relative" onClick={() => SetOpen(!Open)}>
                  <img
                    src={session.photoURL ? session.photoURL : "/images/1.jpg"}
                    className="w-12 h-12 rounded-full ml-2 object-cover"
                  />
                  {Open && (
                    <div className="  flex flex-col py-3 items-start animate__animated animate__pulse w-[150px] bg-white absolute right-0 top-12 shadow-xl">
                      {isadmin && (
                        <Link
                          to="/admin/dashboard"
                          className="hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-user-line mr-2"></i>Admin
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        className="hover:bg-gray-100 w-full text-left p-2"
                      >
                        <i className="ri-user-line mr-2"></i>my Profile
                      </Link>
                      <Link
                        to="/cart"
                        className="hover:bg-gray-100 w-full text-left p-2"
                      >
                        <i className="ri-shopping-cart-fill mr-2"></i>Cart
                      </Link>

                      <Link
                        onClick={() => signOut(auth)}
                        className="hover:bg-gray-100 w-full text-left p-2"
                      >
                        <i className="ri-logout-circle-r-line mr-2"></i>Logout
                      </Link>
                    </div>
                  )}
                </button>
              )}
            </ul>

            <button className="md:hidden" onClick={() => setsidenav(!sidenav)}>
              <i className="ri-dashboard-line  text-2xl "></i>
            </button>

            <aside
              className="  md:hidden overflow-hidden h-full   bg-[#3B82F6] fixed top-0 left-0  "
              style={{
                width: sidenav ? 280 : 0,
                transition: "0.3s",
              }}
            >
              <div className="flex flex-col gap-0 items-center ">
                {session && (
                  <button
                    className="relative flex flex-col items-center"
                    onClick={() => SetOpen(!Open)}
                  >
                    <img
                      src={
                        session.photoURL ? session.photoURL : "/images/1.jpg"
                      }
                      className="w-12 h-12 rounded-full ml-2 object-cover mt-3 text-center"
                    />
                    <div className="flex flex-col">
                      <p className=" text-white font-extrabold">
                        {session.displayName}
                      </p>
                      <p className="font-medium text-white">{session.email}</p>
                    </div>
                    {Open && (
                      <div className="  flex flex-col py-3 items-start animate__animated animate__pulse w-[150px] bg-white absolute right-0 top-12 shadow-xl">
                        <Link
                          to="/profile"
                          className="hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-user-line mr-2"></i>my Profile
                        </Link>
                        <Link
                          to="/cart"
                          className="hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-shopping-cart-fill mr-2"></i>Cart
                        </Link>

                        <Link
                          onClick={() => signOut(auth)}
                          className="hover:bg-gray-100 w-full text-left p-2"
                        >
                          <i className="ri-logout-circle-r-line mr-2"></i>Logout
                        </Link>
                      </div>
                    )}
                  </button>
                )}

                {Menu.map((item, index) => (
                  <Link
                    className=" hover:bg-rose-600 w-full text-center p-3 font-bold hover:cursor-pointer"
                    key={index}
                    style={{
                      background:
                        location.pathname === item.link
                          ? "#E11D48"
                          : "transparent",
                    }}
                    to={item.link}
                  >
                    <div className="flex mx-auto justify-center items-center gap-2  hover:text-white">
                      <p className={item.icon}></p>

                      <label>{item.label}</label>
                    </div>
                  </Link>
                ))}
                {session ? (
                  <Link
                    to="/login"
                    className="w-full text-center text-2xl p-3 hover:bg-rose-800 hover:text-white font-extrabold"
                    onClick={() => signOut(auth)}
                  >
                    <i className="ri-logout-circle-fill mr-4"></i>
                    LogOut
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="w-full text-center text-2xl p-3 hover:bg-rose-800 hover:text-white font-extrabold"
                  >
                    <i className="ri-login-circle-fill mr-4"></i>
                    LogIn
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </nav>
        <div>{children}</div>
        <footer className="bg-orange-600 ">
          <div className="w-10/12 mx-auto grid md:grid-cols-4  md:gap-8  gap-2">
            <div className="md:py-10 ">
              <h1 className="font-bold my-2 text-white"> websites Links</h1>

              <ul className="space-y-3">
                <li>
                  {" "}
                  <Link to="/">
                    {" "}
                    <i class="ri-facebook-circle-fill mr-2"></i>Facebook
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i class="ri-telegram-fill mr-2"></i>Instagram
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i class="ri-instagram-line mr-2"></i>Telegram
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i className="ri-twitter-x-line mr-2"></i>Twitter
                  </Link>
                </li>
                <li>
                  <Link to="/sigp">
                    {" "}
                    <i className="ri-youtube-line mr-2"></i>Youtube
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:py-10 space-y-7 ">
              <h1 className="font-bold my-2 text-white">Brannd Details</h1>
              <p className="text-gray-200 text-start ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum
              </p>
              <img src="/images/crop.png" className="w-[70px] h-[50px] mt-3" />
            </div>
            <div className=" md:py-10">
              <h1 className="font-bold my-2 text-white"> websites Links</h1>

              <ul className="space-y-3">
                {Menu.map((item, index) => (
                  <li key={index} className="mb-2 ">
                    <Link to={item.link}>{item.label}</Link>
                  </li>
                ))}

                <li>
                  {" "}
                  <Link to="/login">session</Link>
                </li>
                <li>
                  <Link to="/signup">sign up</Link>
                </li>
              </ul>
            </div>

            <div className="md:py-10">
              <h1 className="font-bold my-2 text-white"> Contact Us</h1>
              <form className="space-y-4">
                <input
                  type="text"
                  className="p-2 w-full rounded"
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="p-2 w-full rounded"
                  placeholder="Enter Email id"
                  required
                />
                <textarea
                  name="message "
                  required
                  placeholder="Message"
                  className="p-2 w-full rounded"
                  rows={3}
                />
                <button className="bg-black py-3 px-6 text-white">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </footer>
      </div>
    </>

    // mobile
  );
};
export default Layout;
