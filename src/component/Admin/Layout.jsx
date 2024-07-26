import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FirebasesApp from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const db = getFirestore(FirebasesApp);
const auth = getAuth(FirebasesApp);
const Layout = ({ children }) => {
  const location = useLocation();
  const [size, setSize] = useState(280);

  const [Mobilesize, SetMoblieSize] = useState(0);
  const [sesstion, setsesstion] = useState(null);
  const [accountMenu, setAccountMenu] = useState(false);

  const [menu, setmenu] = useState([
    {
      label: "Dashboard",
      icon: <i class="ri-dashboard-horizontal-line mr-2"></i>,
      link: "/admin/dashboard",
    },
    {
      label: "customers",
      icon: <i class="ri-id-card-line mr-2"></i>,
      link: "/admin/customers",
    },
    {
      label: "products",
      icon: <i class="ri-store-line mr-2"></i>,
      link: "/admin/products",
    },
    {
      label: "Orders",
      icon: <i className="ri-shape-line mr-2"></i>,

      link: "/admin/orders",
    },
    {
      label: "Payments",
      icon: <i class="ri-bank-card-line mr-2"></i>,

      link: "/admin/payments",
    },
    {
      label: "Settings",
      icon: <i class="ri-logout-box-r-line mr-2"></i>,

      link: "/admin/Settings",
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setsesstion(user);
      } else {
        setsesstion(null);
      }
    });
  }, [sesstion]);
  console.log(sesstion, "not");

  return (
    <>
      {/* for desktop */}
      <div className="md:block hidden">
        <aside
          className="bg-indigo-600 fixed top-0 left-0 h-full overflow-hidden"
          style={{
            width: size,
            transition: "0.3s",
          }}
        >
          <div className="flex flex-col">
            {menu.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="px-4 py-3 hover:bg-rose-500 hover:text-white p-3"
                style={{
                  background:
                    location.pathname === item.link ? "#E11D48" : "transparent",
                }}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            <button
              className="px-4 py-3 hover:bg-rose-500 hover:text-white p-3 text-left"
              onClick={() => signOut(auth)}
            >
              <i className="ri-logout-box-r-line mr-2"></i> Logout
            </button>
          </div>
        </aside>
        <section
          className="bg-gray-100 min-h-screen"
          style={{
            marginLeft: size,
            transition: "0.3s",
          }}
        >
          <nav className="bg-white p-6 shadow flex items-center justify-between sticky   top-0 z-50  ">
            <div className="flex gap-4 items-center">
              <button
                className="bg-gray-50 hover:bg-indigo-600 hover:text-white w-8 h-8"
                onClick={() => setSize(size === 280 ? 0 : 280)}
              >
                <i className="ri-menu-2-line text-xl"></i>
              </button>
              <h1 className="text-md font-semibold">Shopcode</h1>
            </div>

            <div>
              <button className="relative">
                <img
                  src="/images/1.jpg"
                  className="w-10 h-10 rounded-full"
                  onClick={() => setAccountMenu(!accountMenu)}
                />
                {accountMenu && (
                  <div className=" animate__animated animate__pulse absolute top-18 right-0 bg-slate-50 p-3  rounded shadow-lg">
                    <div>
                      <h1 className="text-lg font-semibold">
                        {sesstion.displayName ? sesstion.displayName : "Admin"}
                      </h1>
                      <p className=" w-full font-semibold text-black ">
                        {sesstion.email}
                      </p>
                      <div className="h-px bg-gray-500 my-4 " />
                      <button
                        onClick={() => signOut(auth)}
                        className="font-extrabold hover:bg-rose-500 w-full py-2"
                      >
                        <i className="ri-logout-circle-r-line mr-2"></i>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </nav>
          <div className="p-6">{children}</div>
        </section>
      </div>
      {/* for mbile */}
      <div className="md:hidden block">
        <aside
          className="bg-indigo-600 fixed top-0 left-0 h-full  z-50 overflow-hidden"
          style={{
            width: Mobilesize,
            transition: "0.3s",
          }}
        >
          <div className="flex flex-col">
            <button
              className="text-start mx-3 mt-3"
              onClick={() => SetMoblieSize(Mobilesize === 0 ? 280 : 0)}
            >
              <i class="ri-dashboard-fill  text-xl"></i>
            </button>

            {menu.map((item, index) => (
              <Link
                to={item.link}
                className="px-4 py-3 hover:bg-rose-500 hover:text-white p-3"
                key={index}
                style={{
                  background:
                    location.pathname === item.link ? "#E11D48" : "transparent",
                }}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            <button className="px-4 py-3 hover:bg-rose-500 hover:text-white p-3 text-left">
              <i className="ri-logout-box-r-line mr-2"></i> Logout
            </button>
          </div>
        </aside>
        <section className="bg-gray-100 h-screen ">
          <nav className="bg-white p-6 shadow flex items-center justify-between sticky  top-0 left-0 z-50">
            <div className="flex gap-4 items-center">
              <button
                className="bg-gray-50 hover:bg-indigo-600 hover:text-white w-8 h-8"
                onClick={() => SetMoblieSize(Mobilesize === 0 ? 280 : 0)}
              >
                <i className="ri-menu-2-line text-xl"></i>
              </button>
              <h1 className="text-md font-semibold">Shopcode</h1>
            </div>

            <div>
              <button className="relative">
                <img
                  src="/images/1.jpg"
                  className="w-10 h-10 rounded-full"
                  onClick={() => setAccountMenu(!accountMenu)}
                />
                {accountMenu && (
                  <div className="absolute top-18 right-0 bg-white w-[200px] p-6 shadow-lg">
                    <div>
                      <h1 className="text-lg font-semibold">Er Saurav</h1>
                      <p className="text-gray-500">example@gmail.com</p>
                      <div className="h-px bg-gray-200 my-4" />
                      <button>
                        <i className="ri-logout-circle-r-line mr-2"></i>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </nav>
          <div className="p-6">{children}</div>
        </section>
      </div>
    </>
  );
};

export default Layout;
