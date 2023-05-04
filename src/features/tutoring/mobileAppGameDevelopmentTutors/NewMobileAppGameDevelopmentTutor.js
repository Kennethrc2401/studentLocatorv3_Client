import NewMobileAppGameDevelopmentTutorForm from './NewMobileAppGameDevelopmentTutorForm';
import { useGetUsersQuery } from '../../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../../hooks/useTitle';

const NewMobileAppGameDevelopmentTutor = () => {
    useTitle('Student Locator | New Mobile App & Game Development Tutor')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({ 
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"}/>

    const content = <NewMobileAppGameDevelopmentTutorForm users={users} />

    return content
}

export default NewMobileAppGameDevelopmentTutor