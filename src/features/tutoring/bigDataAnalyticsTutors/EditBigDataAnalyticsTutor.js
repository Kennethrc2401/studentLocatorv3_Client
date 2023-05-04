import { useParams } from 'react-router-dom';
import EditBigDataAnalyticsTutorForm from './EditBigDataAnalyticsTutorForm';
import { useGetBigDataAnalyticsTutorsQuery } from './bigDataAnalyticsTutorApiSlice';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import useAuth from '../../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const EditBigDataAnalyticsTutor = () => {
    useTitle('StudentLocator: Edit Big Data Analytics Tutor')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { bigDataAnalyticsTutor } = useGetBigDataAnalyticsTutorsQuery("bigDataAnalyticsTutorsList", {
        selectFromResult: ({ data }) => ({
            bigDataAnalyticsTutor: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!bigDataAnalyticsTutor || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (bigDataAnalyticsTutor.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditBigDataAnalyticsTutorForm bigDataAnalyticsTutor={bigDataAnalyticsTutor} users={users} />

    return content
}
export default EditBigDataAnalyticsTutor;