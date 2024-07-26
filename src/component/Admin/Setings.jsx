import React, { useEffect, useId } from "react";
import Layout from "./Layout";
import FirebasesApp from "../../firebase-config";
import { onAuthStateChanged, getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const auth = getAuth(FirebasesApp);
const db = getFirestore(FirebasesApp);
const storage = getStorage();

const Profile = () => {
  const navigate = useNavigate();
  const [order, setorder] = useState([]);
  const [loader, setloader] = useState(false);
  const [newLoaer, setnewloader] = useState(false);
  const [session, setseession] = useState(null);
  const [Formdata, setFormdata] = useState({
    fullname: "",
    email: "",
  });

  const [adressdata, setAddressdata] = useState({
    address: "",
    city: "",
    country: "",
    state: "",
    pin: "",

    mobile: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setseession(user);
      } else {
        navigate("/login");

        setseession(false);
      }
    });
  }, []);

  useEffect(() => {
    const req = async () => {
      if (session) {
        setFormdata({
          ...Formdata,
          fullname: session.displayName,
          mobile: session.phoneNumber ? session.phoneNumber : "",
        });

        setAddressdata({
          ...adressdata,
          userid: session.uid,
        });

        //fetchdat

        const col = collection(db, "addresses");
        const q = query(col, where("userid", "==", session.uid));
        const snapshort = await getDocs(q);
        snapshort.forEach((doc) => {
          const addres = doc.data();

          setAddressdata({
            ...adressdata,
            ...addres,
          });
        });
      }
    };
    req();
  }, [session]);

  useEffect(() => {
    const req = async () => {
      if (session) {
        const col = collection(db, "order");
        const q = query(col, where("Userid", "==", session.uid));
        const snapshort = await getDocs(q);
        const temp = [];
        snapshort.forEach((doc) => {
          const data = doc.data();
          temp.push(data);
        });
        setorder(temp);
      }
    };
    req();
  }, [session, order]);

  const HandleAdress = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setAddressdata({
      ...adressdata,
      [name]: value,
    });
  };

  const AdressSave = async (e) => {
    try {
      e.preventDefault();

      setloader(true);
      await addDoc(collection(db, "addresses"), adressdata);
      new swal({
        icon: "success",
        title: "Sucesfull",
      });
    } catch (error) {
      setloader(true);

      new swal({
        icon: "error",
        title: "failed!!",
        text: error.message,
      });
    } finally {
      setloader(false);
    }
  };

  const Colorstatus = (status) => {
    if (status === "Dispatched") return "bg-orange-600";
    else if (status === "Delivers") return "bg-green-600";
    else if (status === "Return") return "bg-rose-600";
    else return "bg-orange-600";
  };

  if (session === null)
    return (
      <>
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
      </>
    );
  const Profilepicture = async (e) => {
    const input = e.target;
    const file = input.files[0];
    const filearray = file.name.split(".");
    const ext = filearray[filearray.length - 1];
    const filname = Date.now() + "." + ext;

    const bucket = ref(storage, `picture/${filname}`);

    setnewloader(true);
    const snapshort = await uploadBytes(bucket, file);
    const url = await getDownloadURL(snapshort.ref);
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
    setnewloader(false);
    setseession({
      ...session,
      photoURL: url,
    });
  };

  const ProfileForm = async (e) => {
    try {
      e.preventDefault();
      setloader(true);

      await updateProfile(auth.currentUser, {
        displayName: Formdata.fullname,
        phoneNumber: Formdata.mobile,
      });
      new swal({
        icon: "success",
        title: "Sucesfull",
      });
    } catch (error) {
      setloader(true);
      new swal({
        icon: "error",
        title: "Failed!!",
        text: error.message,
      });
    } finally {
      setloader(false);
    }
  };

  const handlechang = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setFormdata({
      ...Formdata,
      [name]: value,
    });
  };

  //addres

  return (
    <Layout>
      <div className="bg-white md:py-12 md:w-6/12 mx-auto shadow-xl  mt-2 pb-16">
        <div className="  flex ml-6">
          <i class="ri-shopping-cart-2-fill text-2xl mr-2"></i>
          <h1 className="font-semibold text-2xl text-gray-600">Orders</h1>
        </div>

        {order.map((item, index) => (
          <>
            <div className="flex  ml-6 w-6/12 gap-4 mt-4" key={index}>
              <img
                src={item.image ? item.image : "/images/12.jpg"}
                className="w-[90px]  rounded "
              />
              <div className="pb-1">
                <h1 className="font-bold">{item.title}</h1>
                <p className="text-gray-600 text-1xl">{item.description}</p>

                <div className="flex gap-3">
                  <h1 className="font-semibold">₹{item.price}</h1>
                  <p className="font-bold">{item.discount}%</p>
                  <p className="font-medium">
                    ₹{item.price - (item.price * item.discount) / 100}
                  </p>
                </div>
                <button
                  className={`px-3 py-1 ${Colorstatus(item.status)} 
                  } rounded-md mt-3 text-white capitalize`}
                >
                  {item.status ? item.status : "pending"}
                </button>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className=" bg-white md:py-12 md:w-6/12 mx-auto shadow-xl  mt-6">
        <div className=" flex ml-6">
          <i className="ri-user-fill mr-2 text-3xl"></i>
          <h1 className="font-semibold text-2xl text-gray-600">Profile</h1>
        </div>

        <hr className="my-4" />
        <div className="my-6 w-16 h-16   mx-auto relative ">
          {newLoaer ? (
            <img src="/images/loader3.gif" className="text-center" />
          ) : (
            <img
              src={session.photoURL ? session.photoURL : "/images/1.jpg"}
              className="rounded-full   w-16 h-16  "
            />
          )}

          <input
            type="file"
            accept="image/*"
            className="absolute top-0  opacity-0 right-0 w-full h-full border-red-600"
            onChange={Profilepicture}
          />
        </div>
        <form className="md:grid grid-cols-2 px-6 gap-4" onSubmit={ProfileForm}>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-medium "> Fullname</label>
            <input
              required
              type="text"
              value={Formdata.fullname}
              name="fullname"
              onChange={handlechang}
              className="border p-2 border-1 outline-none "
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-medium "> Email</label>
            <input
              required
              disabled
              type="email"
              onChange={handlechang}
              value={session.email}
              name="email"
              className="border border-gray-300  p-2 border-1 outline-none "
            />
          </div>

          <button className="bg-green-500 px-6 py-2 rounded w-fit  text-white font-semibold hover:bg-rose-600 mb-2 ">
            <i className="ri-save-line mr-2"></i> Save
          </button>
        </form>
      </div>

      {/* 2ns */}

      <div
        className="bg-white md:py-12 md:w-6/12 mx-auto shadow-xl  mt-5"
        id="update"
      >
        <div className=" flex ml-6">
          <i className="ri-user-fill mr-2 text-3xl"></i>
          <h1 className="font-semibold text-2xl text-gray-600">
            Delivery Address
          </h1>
        </div>

        <hr className="my-4" />

        <form className="md:grid grid-cols-2 px-6 gap-4" onSubmit={AdressSave}>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-medium "> Area/Street</label>
            <input
              required
              type="text"
              onChange={HandleAdress}
              name="address"
              value={adressdata.address}
              className="border border-gray-300  p-2 border-1 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-medium "> country</label>
            <input
              required
              type="text"
              onChange={HandleAdress}
              name="country"
              value={adressdata.country}
              className="border border-gray-300  p-2 border-1 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-medium "> City</label>
            <input
              required
              type="text"
              onChange={HandleAdress}
              name="city"
              value={adressdata.city}
              className="border border-gray-300  p-2 border-1 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-medium "> State</label>
            <input
              required
              type="text"
              onChange={HandleAdress}
              name="state"
              value={adressdata.state}
              className="border border-gray-300  p-2 border-1 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="font-medium "> Pin</label>
            <input
              required
              onChange={HandleAdress}
              type="number"
              name="pin"
              value={adressdata.pin}
              className="border border-gray-300  p-2 border-1 outline-none"
            />
          </div>
          <div />
          <div className="flex flex-col gap-2">
            <label className="font-medium "> Mobile no</label>
            <input
              required
              value={adressdata.mobile}
              onChange={HandleAdress}
              type="number"
              name="mobile"
              className="border border-gray-300 p-2 border-1 outline-none"
            />
          </div>

          <div />

          <button
            className="bg-green-500 px-6 py-2 w-fit rounded  text-white font-semibold hover:bg-rose-600 mb-2 "
            id="add"
          >
            <i className="ri-save-line mr-2"></i> Save
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
