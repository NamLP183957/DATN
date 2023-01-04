import React from "react";
import Navbar from "../src/components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import UnAuthorize from "./pages/unauthorize/UnAuthorize";
import RequireAuth from "./components/RequireAuth";
import { ROLES } from "./utils/constants/role";
import Home from "./pages/student/home/Home";
import JobDetail from "./pages/student/job-detail/JobDetail";
import Apply from "./pages/student/apply/Apply";
import CV from "./pages/student/cv/CV";
import BusinessHome from "./pages/business/home/BusinessHome";
import BusinessJobDetail from "./pages/business/job-detail/BusinessJobDetail";
import BusinessApply from "./pages/business/apply/BusinessApply";
import JobApplicant from "./pages/business/job-applicant/JobApplicant";
import BusinessCV from "./pages/business/cv/BusinessCV";
import AdminHome from "./pages/admin/home/AdminHome";
import AdminJobCategory from "./pages/admin/job-category/AdminJobCategory";
import AdminAccount from "./pages/admin/account/AdminAccount";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="unauthorize" element={<UnAuthorize />} />

          {/* private routes */}
          <Route element={<RequireAuth allowedRoles={ROLES.STUDENT}  />}>
            <Route path="/student/home/*" element={<Home />} />
            <Route path="/student/job/:jobCode" element={<JobDetail />}/>
            <Route path="/student/apply" element={<Apply />} />
            <Route path="/student/cv/*" element={<CV />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={ROLES.BUSINESS} />}>
            <Route path="/business/home" element={<BusinessHome />} />
            <Route path="/business/job/:jobCode" element={<BusinessJobDetail />}/>
            <Route path="/business/apply" element={<BusinessApply />} />
            <Route path="/business/apply/:jobCode/:id" element={<JobApplicant />}/>
            <Route path="/business/cv" element={<BusinessCV />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={ROLES.ADMIN} />}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/business/job-category" element={<AdminJobCategory />} />
            <Route path="/business/account" element={<AdminAccount />}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
