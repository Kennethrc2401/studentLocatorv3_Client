import { useParams } from 'react-router-dom';
import EditStudentRecordForm from './EditStudentRecordForm';
import { useGetStudentRecordsQuery } from './studentRecordApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';

const EditStudentRecord = () => {
    useTitle('StudentLocator: Edit Student Record')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { studentRecord } = useGetStudentRecordsQuery("studentRecordsList", {
        selectFromResult: ({ data }) => ({
            studentRecord: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!studentRecord || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (studentRecord.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditStudentRecordForm studentRecord={studentRecord} users={users} />

    return content
}
export default EditStudentRecord;