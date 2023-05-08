import { useGetCyberSecurityTutorsQuery } from "./cyberSecurityTutorApiSlice"
import CyberSecurityTutor from "./CyberSecurityTutor"
import useAuth from "../../../hooks/useAuth"
import useTitle from "../../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const CyberSecurityTutorsList = () => {
    useTitle('Student Locator: Cyber Security Tutors')

    const { username, isManager, isAdmin, isStudent, isTutor} = useAuth()

    const {
        data: cyberSecurityTutors,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCyberSecurityTutorsQuery('cyberSecurityTutorsList', {
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
        const { ids, entities } = cyberSecurityTutors

        let filteredIds
        if (isManager || isAdmin || isTutor || isStudent) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(cyberSecurityTutorId => entities[cyberSecurityTutorId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(cyberSecurityTutorId => <CyberSecurityTutor key={cyberSecurityTutorId} cyberSecurityTutorId={cyberSecurityTutorId} />)

        content = (
            <table className="table table--cyberSecurityTutors">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th cyberSecurityTutor__dateEnrolled">Enrolled</th>
                        <th scope="col" className="table__th cyberSecurityTutor__name">Name</th>
                        <th scope="col" className="table__th cyberSecurityTutor__availability">Availability</th>
                        <th scope="col" className="table__th cyberSecurityTutor__phone">Phone</th>
                        <th scope="col" className="table__th cyberSecurityTutor__email">Email</th>
                        <th scope="col" className="table__th cyberSecurityTutor__expertise">Expertise</th>
                        {/* <th scope="col" className="table__th cyberSecurityTutor__edit">Edit</th> */}
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
export default CyberSecurityTutorsList