import NewMachineLearningTutorForm from './NewMachineLearningTutorForm';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const NewMachineLearningTutor = () => {
    useTitle('Student Locator | New Machine Learning Tutor')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({ 
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"}/>

    const content = <NewMachineLearningTutorForm users={users} />

    return content
}

export default NewMachineLearningTutor;