import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { studentRecordsApiSlice } from '../students/studentRecordApiSlice';
import { bigDataAnalyticsTutorsApiSlice } from '../tutoring/bigDataAnalyticsTutors/bigDataAnalyticsTutorApiSlice'
import { cyberSecurityTutorsApiSlice } from '../tutoring/cyberSecurityTutors/cyberSecurityTutorApiSlice'
import { machineLearningTutorsApiSlice } from '../tutoring/machineLearningTutors/machineLearningTutorApiSlice'
import { mobileAppGameDevelopmentTutorsApiSlice } from '../tutoring/mobileAppGameDevelopmentTutors/mobileAppGameDevelopmentTutorApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(studentRecordsApiSlice.util.prefetch('getStudentRecords', 'studentRecordsList', { force: true }));
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(bigDataAnalyticsTutorsApiSlice.util.prefetch('getBigDataAnalyticsTutors', 'bigDataAnalyticsTutorsList', { force: true }))
        store.dispatch(cyberSecurityTutorsApiSlice.util.prefetch('getCyberSecurityTutors', 'cyberSecurityTutorsList', { force: true }))
        store.dispatch(machineLearningTutorsApiSlice.util.prefetch('getMachineLearningTutors', 'machineLearningTutorsList', { force: true }))
        store.dispatch(mobileAppGameDevelopmentTutorsApiSlice.util.prefetch('getMobileAppGameDevelopmentTutors', 'mobileAppGameDevelopmentTutorsList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch