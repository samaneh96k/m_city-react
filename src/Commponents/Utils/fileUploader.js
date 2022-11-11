
import React , { useState } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const FileUploader = (props) => {

  const [imgUrl, setImgUrl] = useState(null);
 
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
      e.preventDefault();
    const file = e.target[0].files[0]
    
   props.filename(file.name);
    if (!file) return;
    const storageRef = ref(storage, `player/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }
  const uploadAgain = () => {
   
    setProgresspercent(false);
    setImgUrl("");
    props.resetImage();
}
  return (
    <div >
      <form onSubmit={handleSubmit} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
        {
        props.defaultImage ?
        <div className="image_upload_container"> <img src={props.defaultImage} alt='uploaded file' height={200} />
          <div className="remove" onClick={()=>uploadAgain()}>remove</div></div>: null
      }
    </div>
  );
}
export default FileUploader