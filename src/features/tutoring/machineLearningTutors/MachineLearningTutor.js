import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetMachineLearningTutorsQuery } from './machineLearningTutorApiSlice';
import { memo } from 'react'

const MachineLearningTutor = ({ machineLearningTutorId }) => {

    const { machineLearningTutor } = useGetMachineLearningTutorsQuery("machineLearningTutorsList", {
        selectFromResult: ({ data }) => ({
            machineLearningTutor: data?.entities[machineLearningTutorId]
        }),
    })

    const navigate = useNavigate()

    if (machineLearningTutor) {
        const created = new Date(machineLearningTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(machineLearningTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/machineLearningTutors/${machineLearningTutorId}`)

        return (
            <tr className="table__row">
                
                {/* <td className="table__cell machineLearningTutor__updated">{updated}</td> */}
                <td className="table__cell machineLearningTutor__created">{created}</td>
                <td className="table__cell machineLearningTutor__name">{machineLearningTutor.name}</td>
                <td className="table__cell machineLearningTutor__tutorid">{machineLearningTutor.tutorID}</td>
                <td className="table__cell machineLearningTutor__availability">{machineLearningTutor.availability}</td>
                <td className="table__cell machineLearningTutor__phone">{machineLearningTutor.phone}</td>
                <td className="table__cell machineLearningTutor__email">{machineLearningTutor.email}</td>
                <td className="table__cell machineLearningTutor__expertise">{machineLearningTutor.expertise}</td>

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

const memoizedNote = memo(MachineLearningTutor)

export default memoizedNote