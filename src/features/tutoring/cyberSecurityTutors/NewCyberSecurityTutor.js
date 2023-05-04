import NewCyberSecurityTutorForm from './NewCyberSecurityTutorForm';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const NewCyberSecurityTutor = () => {
    useTitle('Student Locator | New Cyber Security Tutor')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({ 
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"}/>

    const content = <NewCyberSecurityTutorForm users={users} />

    return content
}

export default NewCyberSecurityTutor;