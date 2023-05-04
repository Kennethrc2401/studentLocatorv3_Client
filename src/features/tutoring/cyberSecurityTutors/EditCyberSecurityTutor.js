import { useParams } from 'react-router-dom';
import EditCyberSecurityTutorForm from './EditCyberSecurityTutorForm';
import { useGetCyberSecurityTutorsQuery } from './cyberSecurityTutorApiSlice';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import useAuth from '../../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const EditCyberSecurityTutor = () => {
    useTitle('Student Locator: Edit Cyber Security Tutor')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { cyberSecurityTutor } = useGetCyberSecurityTutorsQuery("cyberSecurityTutorsList", {
        selectFromResult: ({ data }) => ({
            cyberSecurityTutor: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!cyberSecurityTutor || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (cyberSecurityTutor.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditCyberSecurityTutorForm cyberSecurityTutor={cyberSecurityTutor} users={users} />

    return content
}
export default EditCyberSecurityTutor;