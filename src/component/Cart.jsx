import React, { useEffect, useState } from "react";
import Layout from "./Layout";

import {
  getFirestore,
  getDocs,
  collection,
  deleteDoc,
  query,
  where,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import useRazorpay from "react-razorpay";

import FirebasesApp from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const auth = getAuth(FirebasesApp);
const db = getFirestore(FirebasesApp);
const Cart = () => {
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [address, setadress] = useState(null);
  const [session, setSession] = useState(null);
  const [updated, setupdated] = useState(false);

  console.log(address);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
    });
  }, []);

  useEffect(() => {
    const req = async () => {
      if (session) {
        const col = collection(db, "Cart");
        const q = query(col, where("Userid", "==", session.uid));
        const snapshot = await getDocs(q);
        const tmp = [];
        snapshot.forEach((doc) => {
          const document = doc.data();
          document.ID = doc.id;
          tmp.push(document);
        });
        setproducts(tmp);
      }
    };
    req();
  }, [session, updated]);

  useEffect(() => {
    const req = async () => {
      if (session)
        try {
          const col = collection(db, "addresses");
          const q = query(col, where("userid", "==", session.uid));
          const snapshort = await getDocs(q);

          snapshort.forEach((doc) => {
            const item = doc.data();
            setadress(item);
            console.log(address);
          });
        } catch (error) {
          console.log(error);
        }
    };
    req();
  }, [session]);
  const BuyNow = async (products) => {
    const price = CalculateTotal(products);

    try {
      const { data } = await axios.post(
        "https://salman-qb42.onrender.com/order",
        {
          amount: price,
        }
      );

      const Options = {
        key: "rzp_test_4QQevUIM8JobUf",
        amount: data.amount,
        order_id: data.orderId,
        name: "Salman Shaop",
        desscrition: "Bulk Product",
        image:
          "https://logos-world.net/wp-content/uploads/2020/05/Huawei-Logo.jpg",
        handler: async (res) => {
          for (let item of products) {
            console.log(item);
            let product = {
              ...item,

              status: "pending",
              Email: session.email,
              name: session.displayName,
              createdAt: serverTimestamp(),
              Home: address,
            };
            await addDoc(collection(db, "order"), product);
            await CartRemove(item.ID);
          }

          navigate("/profile");
        },
        notes: {
          name: session.displayName,
        },
      };

      const rzp = new Razorpay(Options);
      rzp.open();
      rzp.on("payment.failed", function (res) {
        navigate("/failed");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // during the Cart removeEventListener
  const CartRemove = (id) => {
    try {
      const rel = doc(db, "Cart", id);
      deleteDoc(rel);
      setupdated(!updated);

      new swal({
        icon: "success",
        text: "Order Placed Succesfully",
      });
    } catch (error) {
      new swal({
        icon: "failed",
        text: { error },
      });
    }
  };

  const HandleeRemove = (id) => {
    try {
      const rel = doc(db, "Cart", id);
      deleteDoc(rel);
      setupdated(!updated);

      new swal({
        icon: "success",
        text: "Deleted succefully!!",
      });
    } catch (error) {
      new swal({
        icon: "failed",
        text: { error },
      });
    }
  };

  const CalculateTotal = (products) => {
    let sum = 0;
    for (let item of products) {
      const amount = Math.floor(
        item.price - (item.price * item.discount) / 100
      );
      console.log(amount);
      sum = sum + amount;
    }
    return sum;
  };
  return (
    <Layout decrementUi={updated}>
      <div className="md:py-16">
        <div className="md:w-6/12 mx-auto shadow-lg rounded flex flex-col gap-6 p-5  pl-8">
          <div className="flex gap-2">
            <i className="ri-shopping-cart-line text-2xl"></i>
            <h1 className="font-semibold  text-2xl">Cart</h1>
          </div>
          <hr className="py-3" />
          <div className=" flex  flex-col gap-4 ">
            {products.map((item, index) => (
              <div className="flex  gap-4 mb-3" key={index}>
                <img
                  src={item.image}
                  className="w-[100px]  rounded bg-white "
                />
                <div className="mt-3  space-y-3 ">
                  <h1 className="font-bold">{item.title}</h1>
                  <div className="flex gap-3 ">
                    <del className="font-normal">₹{item.price}</del>
                    <p className="font-semibold ">
                      ₹{item.price - (item.price * item.discount) / 100}
                    </p>
                    <p className="text-gray-500">({item.discount})% Discount</p>
                  </div>
                  <button
                    className="bg-rose-500 px-2 py-1 text-white border-lg rounded hover:bg-red-600"
                    onClick={() => HandleeRemove(item.ID)}
                  >
                    <i className="ri-delete-bin-5-line mr-2"></i>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <div className="flex  justify-between">
            <h1 className="text-2xl font-semibold">
              Total:₹{CalculateTotal(products).toLocaleString()}
            </h1>
            {products.length > 0 && (
              <button
                className="bg-green-500 px-4 py-2  text-white border-lg rounded hover:bg-rose-500"
                onClick={() => BuyNow(products)}
              >
                <i class="ri-shopping-cart-2-fill mr-2"></i>
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
