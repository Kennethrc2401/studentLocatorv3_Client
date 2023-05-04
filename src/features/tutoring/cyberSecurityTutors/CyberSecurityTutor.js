import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetCyberSecurityTutorsQuery } from './cyberSecurityTutorApiSlice'
import { memo } from 'react'

const CyberSecurityTutor = ({ cyberSecurityTutorId }) => {

    const { cyberSecurityTutor } = useGetCyberSecurityTutorsQuery("cyberSecurityTutorsList", {
        selectFromResult: ({ data }) => ({
            cyberSecurityTutor: data?.entities[cyberSecurityTutorId]
        }),
    })

    const navigate = useNavigate()

    if (cyberSecurityTutor) {
        const created = new Date(cyberSecurityTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(cyberSecurityTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/cyberSecurityTutors/${cyberSecurityTutorId}`)

        return (
            <tr className="table__row">
                
                {/* <td className="table__cell cyberSecurityTutor__updated">{updated}</td> */}
                <td className="table__cell cyberSecurityTutor__created">{created}</td>
                <td className="table__cell cyberSecurityTutor__name">{cyberSecurityTutor.name}</td>
                <td className="table__cell cyberSecurityTutor__tutorid">{cyberSecurityTutor.tutorID}</td>
                <td className="table__cell cyberSecurityTutor__availability">{cyberSecurityTutor.availability}</td>
                <td className="table__cell cyberSecurityTutor__phone">{cyberSecurityTutor.phone}</td>
                <td className="table__cell cyberSecurityTutor__email">{cyberSecurityTutor.email}</td>
                <td className="table__cell cyberSecurityTutor__expertise">{cyberSecurityTutor.expertise}</td>

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

const memoizedNote = memo(CyberSecurityTutor)

export default memoizedNote