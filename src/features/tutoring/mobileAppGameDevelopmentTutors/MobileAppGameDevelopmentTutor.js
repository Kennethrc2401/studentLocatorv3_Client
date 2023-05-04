import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetMobileAppGameDevelopmentTutorsQuery } from './mobileAppGameDevelopmentTutorApiSlice';
import { memo } from 'react'

const MobileAppGameDevelopmentTutor = ({ mobileAppGameDevelopmentTutorId }) => {

    const { mobileAppGameDevelopmentTutor } = useGetMobileAppGameDevelopmentTutorsQuery("mobileAppGameDevelopmentTutorsList", {
        selectFromResult: ({ data }) => ({
            mobileAppGameDevelopmentTutor: data?.entities[mobileAppGameDevelopmentTutorId]
        }),
    })

    const navigate = useNavigate()

    if (mobileAppGameDevelopmentTutor) {
        const created = new Date(mobileAppGameDevelopmentTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(mobileAppGameDevelopmentTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/mobileAppGameDevelopmentTutors/${mobileAppGameDevelopmentTutorId}`)

        return (
            <tr className="table__row">
                
                {/* <td className="table__cell mobileAppGameDevelopmentTutor__updated">{updated}</td> */}
                <td className="table__cell mobileAppGameDevelopmentTutor__created">{created}</td>
                <td className="table__cell mobileAppGameDevelopmentTutor__name">{mobileAppGameDevelopmentTutor.name}</td>
                <td className="table__cell mobileAppGameDevelopmentTutor__tutorid">{mobileAppGameDevelopmentTutor.tutorID}</td>
                <td className="table__cell mobileAppGameDevelopmentTutor__availability">{mobileAppGameDevelopmentTutor.availability}</td>
                <td className="table__cell mobileAppGameDevelopmentTutor__phone">{mobileAppGameDevelopmentTutor.phone}</td>
                <td className="table__cell mobileAppGameDevelopmentTutor__email">{mobileAppGameDevelopmentTutor.email}</td>
                <td className="table__cell mobileAppGameDevelopmentTutor__expertise">{mobileAppGameDevelopmentTutor.expertise}</td>

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

const memoizedNote = memo(MobileAppGameDevelopmentTutor)

export default memoizedNote