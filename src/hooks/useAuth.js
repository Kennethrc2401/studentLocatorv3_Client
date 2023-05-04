import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isTutor = false
    let isStudent = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        isTutor = roles.includes('Tutor')
        isStudent = roles.includes('Student')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"
        if (isTutor) status = "Tutor"
        if (isStudent) status = "Student"

        return { username, roles, status, isManager, isAdmin, isTutor, isStudent }
    }

    return { username: '', roles: [], isManager, isAdmin, status, isTutor, isStudent }
}
export default useAuth