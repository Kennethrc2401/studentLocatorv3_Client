import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin, isTutor, isStudent } = useAuth()

    useTitle(`Student Locator: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/bigDataAnalyticsTutors">View Big Data Analytics Tutors</Link></p>
            <p><Link to="/dash/bigDataAnalyticsTutors/new">Add New Big Data Analytics Tutor</Link></p>

            <p><Link to="/dash/cyberSecurityTutors">View Cyber Security Tutors</Link></p>
            <p><Link to="/dash/cyberSecurityTutors/new">Add New Cyber Security Tutor</Link></p>

            <p><Link to="/dash/machineLearningTutors">View Machine Learning Tutors</Link></p>
            <p><Link to="/dash/machineLearningTutors/new">Add New Machine Learning Tutor</Link></p>

            <p><Link to="/dash/mobileAppGameDevelopmentTutors">View Mobile App Game Development Tutors</Link></p>
            <p><Link to="/dash/mobileAppGameDevelopmentTutors/new">Add New Mobile App Game Development Tutor</Link></p>

            <p><Link to="/dash/studentRecords">View Student Records</Link></p>
            <p><Link to="/dash/studentRecords/new">Add new Student Record</Link></p>

             <p><Link to="/dash/notes">View Notes</Link></p>
            <p><Link to="/dash/notes/new">Add New Notes</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    )

    return content
}
export default Welcome