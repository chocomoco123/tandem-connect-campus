
import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import RoleSelection from './RoleSelection';
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';
import CommitteeLogin from './CommitteeLogin';
import StudentSignup from './StudentSignup';
import TeacherSignup from './TeacherSignup';
import CommitteeSignup from './CommitteeSignup';

const LoginRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="login" element={<RoleSelection isLogin={true} />} />
      <Route path="login/student" element={<StudentLogin />} />
      <Route path="login/teacher" element={<TeacherLogin />} />
      <Route path="login/committee" element={<CommitteeLogin />} />
      
      <Route path="signup" element={<RoleSelection isLogin={false} />} />
      <Route path="signup/student" element={<StudentSignup />} />
      <Route path="signup/teacher" element={<TeacherSignup />} />
      <Route path="signup/committee" element={<CommitteeSignup />} />
      
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default LoginRoutes;
