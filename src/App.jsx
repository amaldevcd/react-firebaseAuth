import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";

function App() {
  const [value, setValue] = useState("");
  const [img,setImg] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.displayName);
      console.log(data.user.photoURL);
      localStorage.setItem("name", data.user.displayName)
      localStorage.setItem("img",data.user.photoURL);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("name"));
    setImg(localStorage.getItem("img"));
  });

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div>
      {value ? (
        <div>
          <h2>Welcome {value}</h2>
          <img src={img} alt="Avatar" style={{width:"200px",borderRadius:"50%"}}></img><br/>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleClick}>Sign in With Google</button>
      )}
    </div>
  );
}

export default App;
