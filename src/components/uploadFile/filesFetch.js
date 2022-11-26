import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

async function uploadFile(fileUpload, file) {
  if (!fileUpload) return;
  const currentFile = fileUpload.name;
  const fileRef = ref(storage, `files/${currentFile}`);

  const uploaded = await uploadBytes(fileRef, fileUpload)
    .then((res) => {
      console.log('File Upload');
      return res.metadata;
    })
    .catch((err) => console.log(err));

  return uploaded;
}

async function fetchFile(urlFile) {
  const fileRef = ref(storage, urlFile);
  const getFile = await getDownloadURL(fileRef).then((res) => (urlFile = res));
  return getFile;
}

export { uploadFile, fetchFile };
