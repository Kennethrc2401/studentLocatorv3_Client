import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket,
    faDatabase,
    faShieldAlt,
    faRobot,
    faCode,
    faUserGraduate
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const STUDENTRECORDS_REGEX = /^\/dash\/studentRecords(\/)?$/
const BIGDATAANALYTICSTUTORS_REGEX = /^\/dash\/bigDataAnalyticsTutors(\/)?$/
const CYBERSECURITYTUTORS_REGEX = /^\/dash\/cyberSecurityTutors(\/)?$/
const MACHINELEARNINGTUTORS_REGEX = /^\/dash\/machineLearningTutors(\/)?$/
const MOBILEAPPGAMEDEVELOPMENTTUTORS_REGEX = /^\/dash\/mobileAppGameDevelopmentTutors(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNewStudentRecordClicked = () => navigate('/dash/studentRecords/new')
    const onNewBigDataAnalyticsTutorClicked = () => navigate('/dash/bigDataAnalyticsTutors/new')
    const onNewCyberSecurityTutorClicked = () => navigate('/dash/cyberSecurityTutors/new')
    const onNewMachineLearningTutorClicked = () => navigate('/dash/machineLearningTutors/new')
    const onNewMobileAppGameDevelopmentTutorClicked = () => navigate('/dash/mobileAppGameDevelopmentTutors/new')

    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')
    const onStudentRecordsClicked = () => navigate('/dash/studentRecords')
    const onBigDataAnalyticsTutorsClicked = () => navigate('/dash/bigDataAnalyticsTutors')
    const onCyberSecurityTutorsClicked = () => navigate('/dash/cyberSecurityTutors')
    const onMachineLearningTutorsClicked = () => navigate('/dash/machineLearningTutors')
    const onMobileAppGameDevelopmentTutorsClicked = () => navigate('/dash/mobileAppGameDevelopmentTutors')

    let dashClass = null
    if (
        !DASH_REGEX.test(pathname) && 
        !NOTES_REGEX.test(pathname) && 
        !USERS_REGEX.test(pathname) && 
        !STUDENTRECORDS_REGEX.test(pathname) && 
        !BIGDATAANALYTICSTUTORS_REGEX.test(pathname) && 
        !CYBERSECURITYTUTORS_REGEX.test(pathname) && 
        !MACHINELEARNINGTUTORS_REGEX.test(pathname) && 
        !MOBILEAPPGAMEDEVELOPMENTTUTORS_REGEX.test(pathname)
        ) {
        dashClass = "dash-header__container--small"
    }
    
    let newStudentRecordButton = null
    if (STUDENTRECORDS_REGEX.test(pathname)) {
        newStudentRecordButton = (
            <button
                className="icon-button"
                title="New Student Record"
                onClick={onNewStudentRecordClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newBigDataAnalyticsTutorButton = null
    if (BIGDATAANALYTICSTUTORS_REGEX.test(pathname)) {
        newBigDataAnalyticsTutorButton = (
            <button
                className="icon-button"
                title="New Big Data Analytics Tutor"
                onClick={onNewBigDataAnalyticsTutorClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newCyberSecurityTutorButton = null
    if (CYBERSECURITYTUTORS_REGEX.test(pathname)) {
        newCyberSecurityTutorButton = (
            <button
                className="icon-button"
                title="New Cyber Security Tutor"
                onClick={onNewCyberSecurityTutorClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newMachineLearningTutorButton = null
    if (MACHINELEARNINGTUTORS_REGEX.test(pathname)) {
        newMachineLearningTutorButton = (
            <button
                className="icon-button"
                title="New Machine Learning Tutor"
                onClick={onNewMachineLearningTutorClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newMobileAppGameDevelopmentTutorButton = null
    if (MOBILEAPPGAMEDEVELOPMENTTUTORS_REGEX.test(pathname)) {
        newMobileAppGameDevelopmentTutorButton = (
            <button
                className="icon-button"
                title="New Mobile App Game Development Tutor"
                onClick={onNewMobileAppGameDevelopmentTutorClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }


    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }
    
    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                className="icon-button"
                title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
            className="icon-button"
            title="Notes"
            onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }
    
    let studentRecordsButton = null
    if (!STUDENTRECORDS_REGEX.test(pathname) && pathname.includes('/dash')) {
        studentRecordsButton = (
            <button
                className="icon-button"
                title="Student Records"
                onClick={onStudentRecordsClicked}
            >
                <FontAwesomeIcon icon={faUserGraduate} />
            </button>
        )
    }

    let bigDataAnalyticsTutorsButton = null
    if (!BIGDATAANALYTICSTUTORS_REGEX.test(pathname) && pathname.includes('/dash')) {
        bigDataAnalyticsTutorsButton = (
            <button
                className="icon-button"
                title="Big Data Analytics Tutors"
                onClick={onBigDataAnalyticsTutorsClicked}
            >
                <FontAwesomeIcon icon={faDatabase} />
            </button>
        )
    }

    let cyberSecurityTutorsButton = null
    if (!CYBERSECURITYTUTORS_REGEX.test(pathname) && pathname.includes('/dash')) {
        cyberSecurityTutorsButton = (
            <button
                className="icon-button"
                title="Cyber Security Tutors"
                onClick={onCyberSecurityTutorsClicked}
            >
                <FontAwesomeIcon icon={faShieldAlt} />
            </button>
        )
    }

    let machineLearningTutorsButton = null
    if (!MACHINELEARNINGTUTORS_REGEX.test(pathname) && pathname.includes('/dash')) {
        machineLearningTutorsButton = (
            <button
                className="icon-button"
                title="Machine Learning Tutors"
                onClick={onMachineLearningTutorsClicked}
            >
                <FontAwesomeIcon icon={faRobot} />
            </button>
        )
    }

    let mobileAppGameDevelopmentTutorsButton = null
    if (!MOBILEAPPGAMEDEVELOPMENTTUTORS_REGEX.test(pathname) && pathname.includes('/dash')) {
        mobileAppGameDevelopmentTutorsButton = (
            <button
                className="icon-button"
                title="Mobile App Game Development Tutors"
                onClick={onMobileAppGameDevelopmentTutorsClicked}
            >
                <FontAwesomeIcon icon={faCode} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newBigDataAnalyticsTutorButton}
                {bigDataAnalyticsTutorsButton}
                {newCyberSecurityTutorButton}
                {cyberSecurityTutorsButton}
                {newMachineLearningTutorButton}
                {machineLearningTutorsButton}
                {newMobileAppGameDevelopmentTutorButton}
                {mobileAppGameDevelopmentTutorsButton}

                {newStudentRecordButton}
                {studentRecordsButton}

                {newNoteButton}
                {notesButton}
                
                {newUserButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">Student Locator</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader