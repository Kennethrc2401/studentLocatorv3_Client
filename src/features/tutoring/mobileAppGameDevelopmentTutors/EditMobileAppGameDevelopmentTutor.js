import { useParams } from 'react-router-dom';
import EditMobileAppGameDevelopmentTutorForm from './EditMobileAppGameDevelopmentTutorForm';
import { useGetMobileAppGameDevelopmentTutorsQuery } from './mobileAppGameDevelopmentTutorApiSlice';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import useAuth from '../../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const EditMobileAppGameDevelopmentTutor = () => {
    useTitle('StudentLocator | Edit Mobile App Game Development Tutor')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { mobileAppGameDevelopmentTutor } = useGetMobileAppGameDevelopmentTutorsQuery("mobileAppGameDevelopmentTutorsList", {
        selectFromResult: ({ data }) => ({
            mobileAppGameDevelopmentTutor: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!mobileAppGameDevelopmentTutor || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (mobileAppGameDevelopmentTutor.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditMobileAppGameDevelopmentTutorForm mobileAppGameDevelopmentTutor={mobileAppGameDevelopmentTutor} users={users} />

    return content
}
export default EditMobileAppGameDevelopmentTutor;