import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetBigDataAnalyticsTutorsQuery } from './bigDataAnalyticsTutorApiSlice'
import { memo } from 'react'

const BigDataAnalyticsTutor = ({ bigDataAnalyticsTutorId }) => {

    const { bigDataAnalyticsTutor } = useGetBigDataAnalyticsTutorsQuery("bigDataAnalyticsTutorsList", {
        selectFromResult: ({ data }) => ({
            bigDataAnalyticsTutor: data?.entities[bigDataAnalyticsTutorId]
        }),
    })

    const navigate = useNavigate()

    if (bigDataAnalyticsTutor) {
        const created = new Date(bigDataAnalyticsTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(bigDataAnalyticsTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/bigDataAnalyticsTutors/${bigDataAnalyticsTutorId}`)

        return (
            <tr className="table__row">
                
                {/* <td className="table__cell bigDataAnalyticsTutor__updated">{updated}</td> */}
                <td className="table__cell bigDataAnalyticsTutor__created">{created}</td>
                <td className="table__cell bigDataAnalyticsTutor__name">{bigDataAnalyticsTutor.name}</td>
                <td className="table__cell bigDataAnalyticsTutor__tutorid">{bigDataAnalyticsTutor.tutorID}</td>
                <td className="table__cell bigDataAnalyticsTutor__availability">{bigDataAnalyticsTutor.availability}</td>
                <td className="table__cell bigDataAnalyticsTutor__phone">{bigDataAnalyticsTutor.phone}</td>
                <td className="table__cell bigDataAnalyticsTutor__email">{bigDataAnalyticsTutor.email}</td>
                <td className="table__cell bigDataAnalyticsTutor__expertise">{bigDataAnalyticsTutor.expertise}</td>

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

const memoizedNote = memo(BigDataAnalyticsTutor)

export default memoizedNote