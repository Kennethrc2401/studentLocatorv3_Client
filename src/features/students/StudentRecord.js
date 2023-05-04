import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetStudentRecordsQuery } from './studentRecordApiSlice';
import { memo } from 'react'

const StudentRecord = ({ studentRecordId }) => {

    const { studentRecord } = useGetStudentRecordsQuery("studentRecordsList", {
        selectFromResult: ({ data }) => ({
            studentRecord: data?.entities[studentRecordId]
        }),
    })

    const navigate = useNavigate()

    if (studentRecord) {
        const created = new Date(studentRecord.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(studentRecord.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/studentRecords/${studentRecordId}`)

        return (
            <tr className="table__row">
                
                {/* <td className="table__cell studentRecord__updated">{updated}</td> */}
                <td className="table__cell studentRecord__created">{created}</td>
                <td className="table__cell studentRecord__name">{studentRecord.name}</td>
                <td className="table__cell studentRecord__phone">{studentRecord.phone}</td>
                <td className="table__cell studentRecord__email">{studentRecord.email}</td>
                <td className="table__cell studentRecord__address">{studentRecord.address}</td>
                <td className="table__cell studentRecord__expertise">{studentRecord.expertise}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
            // Maybe add a <br /> tag here to separate the records
        )

    } else return null
}

const memoizedNote = memo(StudentRecord)

export default memoizedNote