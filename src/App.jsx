import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { auth,provider } from './config'
import { signInWithPopup } from 'firebase/auth'


function App() {
  const [value,setValue] = useState('');
  const handleClick = () =>
  {
    signInWithPopup(auth,provider).then((data)=>{
      setValue(data.user.email)
      localStorage.setItem("email",data.user.email);
    })
  }

  useEffect(()=>{
    setValue(localStorage.getItem("email"))
  })

  const logout = () =>
  {
    localStorage.clear()
    window.location.reload();
  }
  return (
  <div>
    {value?<div><h2>Welcome {value}</h2>
    <button onClick={logout}>Logout</button>
    </div>:
      <button onClick={handleClick}>Sign in With Google</button>}
  </div>
  )
}

export default App
