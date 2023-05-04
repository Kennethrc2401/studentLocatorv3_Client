import { useGetMobileAppGameDevelopmentTutorsQuery } from "./mobileAppGameDevelopmentTutorApiSlice"
import MobileAppGameDevelopmentTutor from "./MobileAppGameDevelopmentTutor"
import useAuth from "../../../hooks/useAuth"
import useTitle from "../../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const MobileAppGameDevelopmentTutorsList = () => {
    useTitle('Student Locator | Mobile App & Game Development Tutors')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: mobileAppGameDevelopmentTutors,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMobileAppGameDevelopmentTutorsQuery('mobileAppGameDevelopmentTutorsList', {
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
        const { ids, entities } = mobileAppGameDevelopmentTutors

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(mobileAppGameDevelopmentTutorId => entities[mobileAppGameDevelopmentTutorId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(mobileAppGameDevelopmentTutorId => <MobileAppGameDevelopmentTutor key={mobileAppGameDevelopmentTutorId} mobileAppGameDevelopmentTutorId={mobileAppGameDevelopmentTutorId} />)

        content = (
            <table className="table table--mobileAppGameDevelopmentTutors">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th mobileAppGameDevelopmentTutor__dateEnrolled">Enrolled</th>
                        <th scope="col" className="table__th mobileAppGameDevelopmentTutor__name">Name</th>
                        <th scope="col" className="table__th mobileAppGameDevelopmentTutor__availability">Availability</th>
                        <th scope="col" className="table__th mobileAppGameDevelopmentTutor__phone">Phone</th>
                        <th scope="col" className="table__th mobileAppGameDevelopmentTutor__email">Email</th>
                        <th scope="col" className="table__th mobileAppGameDevelopmentTutor__expertise">Expertise</th>
                        {/* <th scope="col" className="table__th mobileAppGameDevelopmentTutor__edit">Edit</th> */}
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
export default MobileAppGameDevelopmentTutorsList