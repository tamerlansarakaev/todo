// Global
import { storage } from '../firebase.js';
import { ref, uploadBytes } from 'firebase/storage';

const uploadFile = ({ fileUpload }) => {
  if (fileUpload === null) return;
  const fileRef = ref(storage, `files/${fileUpload.name}`);
  uploadBytes(fileRef, fileUpload);
};

export default uploadFile;
