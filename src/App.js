import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import StudentRecordsList from './features/students/StudentRecordsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import EditStudentRecord from './features/students/EditStudentRecord'
import NewStudentRecord from './features/students/NewStudentRecord'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Dan D. Repairs')

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

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

                <Route path="studentRecords">
                  <Route index element={<StudentRecordsList />} />
                  <Route path=":id" element={<EditStudentRecord />} />
                  <Route path="new" element={<NewStudentRecord />} />
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

// Left off at: https://youtu.be/CvCiNeLnZ00?t=27117
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