import {Routes, Route} from 'react-router-dom';
import Login from './Components/Authentication/Login'
import Home from './Components/Home'
import Main from './Components/Users/Main'
import ProtectedRoute from './ProtectedRoute'
import Signout from './Components/Authentication/Signout'
import ForgotPass from './Components/Authentication/ForgotPass';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} end={true} />
      <Route path="/login" element={<Login/>} end={true} />
      <Route path="/signout" element={<Signout/>} end={true} />
      <Route path="/forget-pass" element={<ForgotPass/>} end={true} />
      
      <Route path="" element={<ProtectedRoute/>}>
        <Route path="user/*" element={<Main/>} end={true} />
      </Route>
    
    </Routes>
  );
}

export default App;
