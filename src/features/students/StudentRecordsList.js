import { useGetStudentRecordsQuery } from "./studentRecordApiSlice"
import StudentRecord from "./StudentRecord"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const StudentRecordsList = () => {
    useTitle('Student Locator: Student Records List')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: studentRecords,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetStudentRecordsQuery('studentRecordsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = studentRecords

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(studentRecordId => entities[studentRecordId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(studentRecordId => <StudentRecord key={studentRecordId} studentRecordId={studentRecordId} />)

        content = (
            <table className="table table--studentRecords">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th studentRecord__status">Username</th>
                        <th scope="col" className="table__th studentRecord__created">Created</th>
                        {/* <th scope="col" className="table__th studentRecord__updated">Updated</th> */}
                        <th scope="col" className="table__th studentRecord__name">Name</th>
                        <th scope="col" className="table__th studentRecord__username">Student</th>
                        <th scope="col" className="table__th studentRecord__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default StudentRecordsList