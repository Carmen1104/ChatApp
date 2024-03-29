import React, {useState} from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    setLoading(true);
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // add profile pic
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">UniVibe</span>
            <span className="title">Signup</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{display: 'none'}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt="add avatar" />
                    <span>Add an Avatar</span>
                </label>
                <button disabled={loading}>Sign Up</button>
                {loading && "Uploading and compressing the image please wait..."}
                {err && <span>Something went wrong</span>}
            </form>
            <p>You already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Signup