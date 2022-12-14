import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import UnAuthorize from '../unauthorize/UnAuthorize';
import RequireAuth from '../../components/RequireAuth';
import JobDetail from '../student/job-detail/JobDetail';
import Apply from '../student/apply/Apply';
import CV from '../student/cv/CV';
import BusinessHome from '../business/home/BusinessHome';
import BusinessJobDetail from '../business/job-detail/BusinessJobDetail';
import BusinessApply from '../business/apply/BusinessApply';
import JobApplicant from '../business/job-applicant/JobApplicant';
import BusinessCV from '../business/cv/BusinessCV';
import AdminHome from '../admin/home/AdminHome';
import AdminJobCategory from '../admin/job-category/AdminJobCategory';
import AdminAccount from '../admin/account/AdminAccount';
import { ROLES } from '../../utils/constants/role';

function App() {
  return (
    <Routes>
      <Navbar />
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Signup />}/>
        <Route path='unauthorize' element={<UnAuthorize />}/>

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={ROLES.STUDENT}/>}>
          <Route path='/student/home' element={<Home />}/>
          <Route path='/student/job/:jobCode' element={<JobDetail />}/>
          <Route path='/student/apply' element={<Apply />}/>
          <Route path='/student/cv' element={<CV />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={ROLES.BUSINESS}/>}>
          <Route path='/business/home' element={<BusinessHome />}/>
          <Route path='/business/job/:jobCode' element={<BusinessJobDetail />}/>
          <Route path='/business/apply' element={<BusinessApply />}/>
          <Route path='/business/apply/:jobCode/:id' element={<JobApplicant />}/>
          <Route path='/business/cv' element={<BusinessCV />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={ROLES.ADMIN}/>}>
          <Route path='/admin/home' element={<AdminHome />}/>
          <Route path='/business/job-category' element={<AdminJobCategory />}/>
          <Route path='/business/account' element={<AdminAccount />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
