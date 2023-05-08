import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
// LISTS
import NotesList from './features/notes/NotesList'
import StudentRecordsList from './features/students/StudentRecordsList'
import UsersList from './features/users/UsersList'
import BigDataAnalyticsTutorList from './features/tutoring/bigDataAnalyticsTutors/BigDataAnalyticsTutorList'
import CyberSecurityTutorList from './features/tutoring/cyberSecurityTutors/CyberSecurityTutorList'
import MachineLearningTutorList from './features/tutoring/machineLearningTutors/MachineLearningTutorList'
import MobileAppGameDevelopmentTutorList from './features/tutoring/mobileAppGameDevelopmentTutors/MobileAppGameDevelopmentTutorList'
// NEW
import NewNote from './features/notes/NewNote'
import NewUserForm from './features/users/NewUserForm'
import NewStudentRecord from './features/students/NewStudentRecord'
import NewBigDataAnalyticsTutor from './features/tutoring/bigDataAnalyticsTutors/NewBigDataAnalyticsTutor'
import NewCyberSecurityTutor from './features/tutoring/cyberSecurityTutors/NewCyberSecurityTutor'
import NewMachineLearningTutor from './features/tutoring/machineLearningTutors/NewMachineLearningTutor'
import NewMobileAppGameDevelopmentTutor from './features/tutoring/mobileAppGameDevelopmentTutors/NewMobileAppGameDevelopmentTutor'
// EDIT
import EditUser from './features/users/EditUser'
import EditNote from './features/notes/EditNote'
import EditStudentRecord from './features/students/EditStudentRecord'
import EditBigDataAnalyticsTutor from './features/tutoring/bigDataAnalyticsTutors/EditBigDataAnalyticsTutor'
import EditCyberSecurityTutor from './features/tutoring/cyberSecurityTutors/EditCyberSecurityTutor'
import EditMachineLearningTutor from './features/tutoring/machineLearningTutors/EditMachineLearningTutor'
import EditMobileAppGameDevelopmentTutor from './features/tutoring/mobileAppGameDevelopmentTutors/EditMobileAppGameDevelopmentTutor'
// AUTH
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Student Locator')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />} path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />} path="studentRecords">
                  <Route index element={<StudentRecordsList />} />
                  <Route path=":id" element={<EditStudentRecord />} />
                  <Route path="new" element={<NewStudentRecord />} />
                </Route>

                <Route path="bigDataAnalyticsTutors">
                  <Route index element={<BigDataAnalyticsTutorList />} />
                  <Route path=":id" element={<EditBigDataAnalyticsTutor />} />
                  <Route path="new" element={<NewBigDataAnalyticsTutor />} />
                </Route>

                <Route path="cyberSecurityTutors">
                  <Route index element={<CyberSecurityTutorList />} />
                  <Route path=":id" element={<EditCyberSecurityTutor />} />
                  <Route path="new" element={<NewCyberSecurityTutor />} />
                </Route>

                <Route path="machineLearningTutors">
                  <Route index element={<MachineLearningTutorList />} />
                  <Route path=":id" element={<EditMachineLearningTutor />} />
                  <Route path="new" element={<NewMachineLearningTutor />} />
                </Route>

                <Route path="mobileAppGameDevelopmentTutors">
                  <Route index element={<MobileAppGameDevelopmentTutorList />} />
                  <Route path=":id" element={<EditMobileAppGameDevelopmentTutor />} />
                  <Route path="new" element={<NewMobileAppGameDevelopmentTutor />} />
                </Route>
                
              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;






















// https://github.com/gitdagray/mern_stack_course

// Sample User - Hank - Employee
// Username: Hank
// Password: !Hb12345

// Sample User - Tom - Admin
// Username: Tom
// Password: !Hb12345

// Sample User - Jeff - Employee, Manager, Admin
// Username: Jeff
// Password: !jeff12345

// Sample User - Mike - Manager
// Username: Mike
// Password: !mike948

// Sample User - Kenneth - Admin
// Username: Kennethrc
// Password: Kerrcr@123

// Sample User - John - Tutor
// Username: Johnjoe
// Password: Johnjoe@123

// Sample User - Jane - Student
// Username: Jane
// Password: Jane@123