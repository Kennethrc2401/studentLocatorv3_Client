import { useGetBigDataAnalyticsTutorsQuery } from "./bigDataAnalyticsTutorApiSlice"
import BigDataAnalyticsTutor from "./BigDataAnalyticsTutor"
import useAuth from "../../../hooks/useAuth"
import useTitle from "../../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const BigDataAnalyticsTutorsList = () => {
    useTitle('Student Locator: Big Data Analytics Tutors')

    const { username, isManager, isAdmin, isTutor, isStudent } = useAuth()

    const {
        data: bigDataAnalyticsTutors,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBigDataAnalyticsTutorsQuery('bigDataAnalyticsTutorsList', {
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
        const { ids, entities } = bigDataAnalyticsTutors

        let filteredIds
        if (isManager || isAdmin || isTutor || isStudent) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(bigDataAnalyticsTutorId => entities[bigDataAnalyticsTutorId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(bigDataAnalyticsTutorId => <BigDataAnalyticsTutor key={bigDataAnalyticsTutorId} bigDataAnalyticsTutorId={bigDataAnalyticsTutorId} />)

        content = (
            <table className="table table--bigDataAnalyticsTutors">
                {/* <h1 style={{display: 'flex'}}>Big Data Analytics Tutors</h1> */}
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th bigDataAnalyticsTutor__dateEnrolled">Enrolled</th>
                        <th scope="col" className="table__th bigDataAnalyticsTutor__name">Name</th>
                        <th scope="col" className="table__th bigDataAnalyticsTutor__availability">Availability</th>
                        <th scope="col" className="table__th bigDataAnalyticsTutor__phone">Phone</th>
                        <th scope="col" className="table__th bigDataAnalyticsTutor__email">Email</th>
                        <th scope="col" className="table__th bigDataAnalyticsTutor__expertise">Expertise</th>
                        {/* <th scope="col" className="table__th bigDataAnalyticsTutor__edit">Edit</th> */}
                    </tr>
                    <tr>
                        
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
export default BigDataAnalyticsTutorsList