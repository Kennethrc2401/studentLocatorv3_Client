import { useParams } from 'react-router-dom';
import EditMachineLearningTutorForm from './EditMachineLearningTutorForm';
import { useGetMachineLearningTutorsQuery } from './machineLearningTutorApiSlice';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import useAuth from '../../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const EditMachineLearningTutor = () => {
    useTitle('StudentLocator | Edit Machine Learning Tutor')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { machineLearningTutor } = useGetMachineLearningTutorsQuery("machineLearningTutorsList", {
        selectFromResult: ({ data }) => ({
            machineLearningTutor: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!machineLearningTutor || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (machineLearningTutor.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditMachineLearningTutorForm machineLearningTutor={machineLearningTutor} users={users} />

    return content
}
export default EditMachineLearningTutor;