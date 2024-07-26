import Layout from "./Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useEffect, useState } from "react";
import FirebasesApp from "../firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  serverTimestamp,
  where,
  query,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const auth = getAuth(FirebasesApp);

const db = getFirestore(FirebasesApp);
const Home = ({ slider, title = "All Products" }) => {
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();

  const [session, setsession] = useState(null);
  const [product, setproduct] = useState([]);
  const [address, setadress] = useState(null);
  const [updateed, setupdated] = useState(false);
  const [query, setquery] = useState("");
  console.log(product);

  {
    const data = product.filter((item) =>
      item.title.toLowerCase().includes("salman")
    );
    console.log(data);
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setsession(user);
      } else {
      }
    });
  }, [session]);

  useEffect(() => {
    const req = async () => {
      if (session)
        try {
          const col = collection(db, "addresses");
          const q = query(col, where("userid", "==", session.uid));
          const snapshort = await getDocs(q);

          snapshort.forEach((doc) => {
            let item = doc.data();

            setadress(item);
          });
        } catch (error) {
          console.log(error);
        }
    };
    req();
  }, [session]);

  useEffect(() => {
    const req = async () => {
      const snapshort = await getDocs(collection(db, "Model"));

      let temp = [];
      snapshort.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        temp.push(product);
      });

      setproduct(temp);
    };
    req();
  }, []);

  const Addtocart = async (item) => {
    try {
      item.Userid = session.uid;
      await addDoc(collection(db, "Cart"), item);
      setupdated(!updateed);
      new swal({
        icon: "success",
        title: "Add cart succesfull !",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const BuyNow = async (product) => {
    try {
      const col = collection(db, "addresses");
      const q = query(col, where("userid", "==", session.uid));
      const snapshort = await getDocs(q);
      console.log(snapshort.empty);

      if (snapshort.empty) {
        new swal({
          icon: "info",
          title: "Please provide a address",
        });
        navigate("/profile#update");

        return false;
      }

      product.Userid = session.uid;
      product.status = "Pending";

      const amount = product.price - (product.price * product.discount) / 100;
      const { data } = await axios.post(
        "https://salman-qb42.onrender.com/order",
        {
          amount: amount,
        }
      );
      console.log(address);
      const Options = {
        key: "rzp_test_4QQevUIM8JobUf",
        amount: data.amount,
        order_id: data.orderId,
        name: "Salman Shaop",
        desscrition: product.title,
        image:
          "https://logos-world.net/wp-content/uploads/2020/05/Huawei-Logo.jpg",
        handler: async (res) => {
          product.Email = session.email;
          product.name = session.displayName;
          product.createdAt = serverTimestamp();
          product.Home = address;
          await addDoc(collection(db, "order"), product);

          navigate("/profile");
        },
        notes: {
          name: session.displayName,
        },
      };

      const rzp = new Razorpay(Options);
      rzp.open();
      rzp.on("payment.failed", function (res) {
        console.log(res);
        navigate("/failed");
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  if (product.length == 0)
    return (
      <Layout>
        <h1 className="font-extrabold red p-16 text-center text-2xl text-red-700">
          Not found Products!!!
        </h1>
      </Layout>
    );
  return (
    <Layout update={updateed}>
      <div>
        {slider && (
          <header>
            <Swiper
              className="cursor-pointer"
              pagination={true}
              navigation={true}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
            >
              <SwiperSlide>
                <img src="/images/p1.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="/images/m2.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="/images/m3.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="/images/m4.jpg" />
              </SwiperSlide>

              <SwiperSlide>
                <img src="/images/m3.jpg" />
              </SwiperSlide>
            </Swiper>
          </header>
        )}

        <div className="md:p-16 p-8 md:space-y-4 space-y-5">
          <div className="flex relative">
            <input
              type="text"
              placeholder="Search here"
              className=" md:w-5/12 p-3 px-6 border-2 border-gray-400 mx-auto rounded"
              onChange={(e) => setquery(e.target.value)}
            />
            <i className="ri-search-line absolute top-3 md:right-[400px] right-[50px] text-2xl"></i>
          </div>

          <h1 className="text-center font-bold text-3xl text-indigo-600">
            {title}
          </h1>
          <p className="text-center md:w-9/12  font-semibold mx-auto mb-5  ">
            Lorem Ipsum has been the industry's standard dummy text ever since t
            has survived not only five ceware like Aldus PageMaker including
            versions.survived not only five ceware like Aldus PageMaker
            including versions.
          </p>
          <div className="md:w-10/12 mx-auto grid md:grid-cols-4 gap-12  md:space-y-0 space-y-6">
            {product
              .filter((item) => item.title.toLowerCase().includes(query))
              .map((item, index) => (
                <div className=" bg-white shadow-lg rounded-lg" key={index}>
                  <img
                    src={item.image ? item.image : "/images/11.jpg"}
                    className="rounded-t-md  
                   object-contain"
                  />
                  <div className=" ">
                    <h1 className="text-lg  font-semibold p-2 capitalize">
                      {item.title}
                    </h1>

                    <div className="flex items-center gap-3 space-x-1">
                      <del className="font-normal">₹ {item.price}</del>

                      <label className="text-lg font-medium">
                        ₹{item.price - (item.price * item.discount) / 100}
                      </label>
                      <label className="text-gray-500 font-bold">
                        {" "}
                        ({item.discount}%)
                      </label>
                    </div>
                  </div>
                  <button
                    className="bg-green-600 px-3 py-2 mt-2 text-white rounded w-full "
                    onClick={() => BuyNow(item)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="bg-rose-600 px-3 py-2 mt-2 text-white rounded w-full "
                    onClick={() => Addtocart(item)}
                  >
                    <i className="ri-shopping-cart-line mr-2"></i>
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
