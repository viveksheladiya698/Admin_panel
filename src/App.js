import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import User from './pages/components/User';
import Viewuser from './pages/components/Viewuser';
import Addrole from './pages/components/Addrole';
import ViewRoll from './pages/components/ViewRoll';
import Addbranch from './pages/components/Addbranch';
import Viewbranch from './pages/components/Viewbranch';
import Course from './pages/components/Course';
import Viewcourse from './pages/components/Viewcourse'
import Addreferance from './pages/components/Addreferance';
import Addinqury from './pages/components/Addinqury';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authchk } from './Store/CounterSlice/CounterReducer';
import Viewreferance from './pages/components/ViewReferance';
import AddStatus from './pages/components/Status';
import View_status from './pages/components/Viewstatus';
import ViewInqury from './pages/components/ViewInqury';


function App() {

  let chk = useSelector((state)=> state.counter.value)
  let dishpath = useDispatch();

  useEffect(()=>{
    dishpath(authchk()); 
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={chk ? <Navigate to={'/dashboard'}/> : <Login />}></Route>
        <Route path='/dashboard' element={chk ? <Dashboard /> : <Navigate to={'/'}/>}>
          <Route path='add/user' element={<User />}></Route>
          <Route path='view/user' element={<Viewuser />}></Route>
          <Route path='add/role' element={<Addrole />}></Route>
          <Route path='view/role' element={<ViewRoll />}></Route>
          <Route path='add/branch' element={<Addbranch />}></Route>
          <Route path='view/branch' element={<Viewbranch />}></Route>
          <Route path='add/course' element={<Course />}></Route>
          <Route path='view/course' element={<Viewcourse />}></Route>
          <Route path='add/reference' element={<Addreferance />}></Route>
          <Route path='view/reference' element={<Viewreferance/>}></Route>
          <Route path='add/status' element={<AddStatus />}></Route>
          <Route path='view/status' element={<View_status />}></Route>
          <Route path='add/inquiry' element={<Addinqury />}></Route>
          <Route path='view/inquiry' element={<ViewInqury />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
