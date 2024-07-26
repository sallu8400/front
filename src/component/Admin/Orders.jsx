import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import FirebasesApp from "../../firebase-config";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const db = getFirestore(FirebasesApp);
const auth = getAuth(FirebasesApp);
const Orders = () => {
  const [order, SetOrder] = useState([]);
  const [showadress, setshowadres] = useState(null);
  const [Index, setIndex] = useState();

  useEffect(() => {
    const req = async () => {
      const data = await getDocs(collection(db, "order"));
      let temp = [];
      data.forEach((doc) => {
        const data = doc.data();
        data.OrderId = doc.id;
        temp.push(data);
      });
      SetOrder(temp);
      console.log(temp);
    };
    req();
  }, []);

  const updateOrder = async (e, id) => {
    try {
      const input = e.target.value;
      console.log(input);

      const ref = doc(db, "order", id);
      await updateDoc(ref, { status: input });
      new swal({
        icon: "success",
        title: "Change scucesfull",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(order[0].createdAt.toDate());
  return (
    <Layout>
      <div className="md:ml-4 overflow-auto">
        <h1 className="font-bold md:py-3">Order</h1>
        <table className="   md:w-full mt-2">
          <thead>
            <tr className="bg-red-400">
              <th className="py-3">Order Id</th>
              <th>Custmer Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Product</th>
              <th className="p-2">Amount</th>
              <th>Date</th>
              <th>Adress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => (
              <tr
                key={index}
                className="text-center  "
                style={{
                  backgroundColor: (index + 1) % 2 == 0 ? "lightgray" : "white",
                }}
              >
                <td className="md:py-4">{item.OrderId}</td>
                <td className="capitalize">{item.name}</td>
                <td className="">{item.Email}</td>
                <td className="p-2">{item.Home.mobile}</td>
                <td className="capitalize">{item.title}</td>
                <td>{item.price}</td>
                <td>
                  {moment(item.createdAt.toDate()).format(
                    "DD-MMM-YYYY , hh:mm:ss"
                  )}
                </td>
                <td>
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      setIndex(index), setshowadres(!showadress);
                    }}
                  >
                    {showadress && Index === index
                      ? "Hide Address"
                      : "show Address"}
                  </button>
                  {showadress && Index === index && (
                    <div className="text-black animate__animated animate__fadeIn">
                      {item.Home.address},{item.Home.state},{item.Home.country}
                      {item.Home.pincode}
                      {item.Home.mobile}
                    </div>
                  )}
                </td>
                <td>
                  <select
                    className="p-1 border-slate-200"
                    onChange={(e) => updateOrder(e, item.OrderId)}
                  >
                    <option value="pending">Pending</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivers">Delivers</option>
                    <option value="Return">Return</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Orders;
