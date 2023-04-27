import NewStudentRecordForm from './NewStudentRecordForm';
import { useGetUsersQuery } from '../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';

const NewStudentRecord = () => {
    useTitle('Student Locator | New Student Record')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({ 
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"}/>

    const content = <NewStudentRecordForm users={users} />

    return content
}

export default NewStudentRecord;