import React, { useEffect, useState } from "react";
import Layout from "./Layout";

import FirebasesApp from "../../firebase-config";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import Uploadfile from "../Util";

const db = getFirestore(FirebasesApp);
const Product = () => {
  const [update, setupdated] = useState(false);
  const [product, Setproduct] = useState([]);
  const [Model, setModel] = useState(false);
  const [Animation, setanimation] = useState(false);
  const [Edit, setEdit] = useState(null);
  const [loader, setloader] = useState(false);
  const model = {
    title: "",
    price: "",
    discount: "",
    description: "",
    category: "",
  };
  const [Data, setData] = useState(model);

  useEffect(() => {
    const req = async () => {
      const snapshort = await getDocs(collection(db, "Model"));
      let temp = [];
      snapshort.forEach((doc) => {
        const x = doc.data();
        x.id = doc.id;

        temp.push(x);
      });
      Setproduct(temp);
    };
    req();
  }, [update]);
  console.log(product);

  const OpenModel = () => {
    setModel(true);
    setanimation(false);
  };

  const ClosModel = () => {
    setanimation(true);
    setTimeout(() => {
      setModel(false);
    }, 500);
  };

  const HandeChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setData({
      ...Data,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();

      await addDoc(collection(db, "Model"), Data);
      setupdated(!update);
      new swal({
        icon: "success",
        title: "Succesfull",
      });
      setData(model);
      ClosModel();
    } catch (error) {
    } finally {
      setloader(false);
    }
  };
  const Handlechange = async (e, id) => {
    const input = e.target;
    const file = input.files[0];
    const path = `products/${Date.now()}.png`;
    const url = await Uploadfile(file, path);
    const ref = doc(db, "Model", id);
    await updateDoc(ref, { image: url });
    setupdated(!update);
    setupdated(!update);
  };

  const EditItem = (item) => {
    try {
      setModel(true);
      setEdit(item);
      setData(item);
    } catch (error) {
      new swal({
        icon: "failed",
        text: { error },
      });
    }
  };

  const HandleUpdate = async (e) => {
    try {
      e.preventDefault();
      const ref = doc(db, "Model", Edit.id);
      await updateDoc(ref, Data);

      setData(model);
      setEdit(null);
      setModel(false);
      setupdated(!update);

      new swal({
        icon: "success",
        text: "Updated Succesfull!!",
      });
    } catch (error) {
      new swal({
        icon: "failed",
        text: { error },
      });
    }
  };
  const DeleteItem = (item) => {
    try {
      const rel = doc(db, "Model", item);
      deleteDoc(rel);
      new swal({
        icon: "success",
        text: "Delewted succefully!!",
      });
      setupdated(!update);
    } catch (error) {
      new swal({
        icon: "failed",
        text: { error },
      });
    }
  };
  return (
    <Layout>
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold py-1">Products</h1>
          <button
            className="p-2 bg-blue-500 text-white rounded mb-2"
            onClick={OpenModel}
          >
            <i className="ri-file-add-line mr-2 "></i>
            Add products
          </button>
        </div>

        <div className="md:grid grid-cols-4 gap-8 ">
          {product.map((item, index) => (
            <div className="bg-white shadow-lg rounded-md  overflow-hidden">
              <div className="relative">
                <img
                  src={item.image ? item.image : "/images/pro.jfif"}
                  className="rounded-t-md h-[300px] w-full object-fill  border border-y-0 "
                />
                <input
                  onChange={(e) => Handlechange(e, item.id)}
                  type="file"
                  className="opacity-0 absolute top-0 left-0 w-full h-full"
                />
              </div>

              <div className="p-3">
                <div className="flex justify-between ">
                  <h1 className="font-semibold text-lg capitalize">
                    {item.title}
                  </h1>
                  <div className="flex gap-3">
                    <i
                      className="ri-pencil-line text-gray-500 rounded p-1 cursor-pointer"
                      onClick={() => EditItem(item)}
                    ></i>
                    <i
                      className="ri-delete-bin-4-fill text-red-500  p-1 cursor-pointer rounded"
                      onClick={() => DeleteItem(item.id)}
                    ></i>
                  </div>
                </div>

                <div className="flex gap-3">
                  <p>₹{item.price - (item.price * item.discount) / 100}</p>
                  <del className="  font-semibold">₹{item.price}</del>
                  <label className="  font-medium">
                    ({item.discount}% Off)
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        {Model && (
          <div
            className={` animate__animated ${
              Animation
                ? "animate__fadeOut animate__faster"
                : "animate__fadeIn animate__faster"
            } flex justify-center items-center bg-black bg-opacity-55 h-full w-full absolute left-0 top-0 z-50`}
          >
            <div
              className={` animate__animated  ${
                Animation
                  ? "animate__zoomOut animate__faster"
                  : "animate__zoomIn animate__faster"
              } bg-white p-6 w-5/12  py-6     rounded border-4`}
            >
              <div className="relative flex justify-between ">
                <h1 className="font-bold text-2xl">New Products</h1>
                <i
                  className="ri-close-fill text-2xl absolute top-0 right-0 mr-2 hover:cursor-pointer"
                  onClick={ClosModel}
                ></i>
              </div>

              <form
                className="grid grid-cols-2 gap-3"
                onSubmit={Edit ? HandleUpdate : HandleSubmit}
              >
                <input
                  required
                  onChange={HandeChange}
                  name="title"
                  value={Data.title}
                  placeholder="Enter the product title here"
                  className="p-2 outline-none border-gray-300 border rounded mt-3 col-span-2"
                />
                <input
                  required
                  onChange={HandeChange}
                  name="price"
                  value={Data.price}
                  type="number"
                  placeholder="Price"
                  className="p-2 outline-none border-gray-300 border rounded mt-3"
                />
                <input
                  required
                  onChange={HandeChange}
                  type="number"
                  value={Data.discount}
                  name="discount"
                  placeholder="Discount"
                  className="p-2 outline-none border-gray-300 border rounded mt-3"
                />
                <input
                  required
                  onChange={HandeChange}
                  type="text"
                  value={Data.category}
                  name="category"
                  placeholder="category"
                  className="p-2 outline-none border-gray-300 border rounded mt-3 col-span-2"
                />
                <textarea
                  required
                  onChange={HandeChange}
                  name="description"
                  value={Data.description}
                  placeholder="Description"
                  className="p-2 outline-none border-gray-300 border rounded mt-3 col-span-2"
                  rows={8}
                />
                <div>
                  {Edit ? (
                    <button className="  bg-orange-600 text-white p-2 rounded">
                      Update
                    </button>
                  ) : (
                    <button className="  bg-indigo-600 text-white p-2 rounded">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {loader && (
          <div className="bg-slate-200 h-full  z-50 fixed top-0 left-0 w-full flex justify-center items-center">
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
        )}
      </div>
    </Layout>
  );
};

export default Product;
