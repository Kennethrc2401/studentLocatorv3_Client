import { useGetMachineLearningTutorsQuery } from "./machineLearningTutorApiSlice"
import MachineLearningTutor from "./MachineLearningTutor"
import useAuth from "../../../hooks/useAuth"
import useTitle from "../../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const MachineLearningTutorsList = () => {
    useTitle('Student Locator | Machine Learning Tutors')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: machineLearningTutors,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMachineLearningTutorsQuery('machineLearningTutorsList', {
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
        const { ids, entities } = machineLearningTutors

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(machineLearningTutorId => entities[machineLearningTutorId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(machineLearningTutorId => <MachineLearningTutor key={machineLearningTutorId} machineLearningTutorId={machineLearningTutorId} />)

        content = (
            <table className="table table--machineLearningTutors">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th machineLearningTutor__dateEnrolled">Enrolled</th>
                        <th scope="col" className="table__th machineLearningTutor__name">Name</th>
                        <th scope="col" className="table__th machineLearningTutor__availability">Availability</th>
                        <th scope="col" className="table__th machineLearningTutor__phone">Phone</th>
                        <th scope="col" className="table__th machineLearningTutor__email">Email</th>
                        <th scope="col" className="table__th machineLearningTutor__expertise">Expertise</th>
                        {/* <th scope="col" className="table__th machineLearningTutor__edit">Edit</th> */}
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
export default MachineLearningTutorsList