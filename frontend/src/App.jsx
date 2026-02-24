import {Navigate, Route , Routes} from "react-router";
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import PageLoader from './components/PageLoader';
import {Toaster} from "react-hot-toast"


function App() {

  const {checkAuth, isCheckingAuth,authUser} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  

  if(isCheckingAuth) return <PageLoader/>

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 relative flex items-center justify-center p-4 overflow-hidden text-white">

  {/* GRID BACKGROUND */}
  <div className="absolute inset-0 
    bg-[linear-gradient(to_right,rgba(59,130,246,0.08)_1px,transparent_1px),
         linear-gradient(to_bottom,rgba(59,130,246,0.08)_1px,transparent_1px)]
    bg-[size:30px_30px]" 
  />

  {/* TOP LEFT GLOW */}
  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] 
    bg-blue-600 opacity-30 rounded-full blur-[140px]" 
  />

  {/* BOTTOM RIGHT GLOW */}
  <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] 
    bg-cyan-500 opacity-25 rounded-full blur-[140px]" 
  />

  {/* CENTER SOFT GLOW */}
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] 
    bg-indigo-500 opacity-20 rounded-full blur-[120px]" 
  />
   
    {/* <button onClick={login} className='z-10'>login</button> */}

    <Routes>
      <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"}/>} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
    </Routes>

    <Toaster/>

     </div>
  )
}

export default App
