import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const storage = getStorage();

const Uploadfile = async (file, path) => {
  const bucket = ref(storage, path);
  const snapshort = await uploadBytes(bucket, file);
  const url = getDownloadURL(snapshort.ref);
  return url;
};

export default Uploadfile;
