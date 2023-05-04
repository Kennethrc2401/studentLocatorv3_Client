import NewBigDataAnalyticsTutorForm from './NewBigDataAnalyticsTutorForm';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const NewBigDataAnalyticsTutor = () => {
    useTitle('Student Locator | New Big Data Analytics Tutor')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({ 
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"}/>

    const content = <NewBigDataAnalyticsTutorForm users={users} />

    return content
}

export default NewBigDataAnalyticsTutor;