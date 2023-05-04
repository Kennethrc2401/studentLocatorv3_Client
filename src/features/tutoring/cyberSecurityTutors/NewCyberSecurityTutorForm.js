import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewCyberSecurityTutorMutation } from "./cyberSecurityTutorApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewCyberSecurityTutorForm = ({ users }) => {

    const [addNewCyberSecurityTutor, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCyberSecurityTutorMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [tutorID, setTutorID] = useState('')
    const [availability, setAvailability] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [expertise, setExpertise] = useState('')

    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setTutorID('')
            setAvailability('')
            setPhone('')
            setEmail('')
            setExpertise('')
            setUserId('')
            navigate('/dash/cyberSecurityTutors')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onTutorIDChanged = e => setTutorID(e.target.value)
    const onAvailabilityChanged = e => setAvailability(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onExpertiseChanged = e => setExpertise(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, tutorID, availability, phone, email, expertise, userId].every(Boolean) && !isLoading

    const onSaveCyberSecurityTutorClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewCyberSecurityTutor({ 
                user: userId, 
                name: name,
                tutorID: tutorID,
                availability: availability,
                phone: phone,
                email: email,
                expertise: expertise
            })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validTutorIDClass = !tutorID ? "form__input--incomplete" : ''
    const validAvailabilityClass = !availability ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''
    const validExpertiseClass = !expertise ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveCyberSecurityTutorClicked}>
                <div className="form__title-row">
                    <h2>New Cyber Security Tutor</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            {/* <FontAwesomeIcon icon={faSave} /> */}
                            Submit
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="cyberSecurityTutor-name">
                    Tutor Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="cyberSecurityTutor-name"
                    name="cyberSecurityTutorName"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-tutorID">
                    Tutor ID:</label>
                <input
                    className={`form__input ${validTutorIDClass}`}
                    id="cyberSecurityTutor-tutorID"
                    name="cyberSecurityTutorTutorID"
                    type="text"
                    autoComplete="off"
                    value={tutorID}
                    onChange={onTutorIDChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-availability">
                    Availability:</label>
                <input
                    className={`form__input ${validAvailabilityClass}`}
                    id="cyberSecurityTutor-availability"
                    name="cyberSecurityTutorAvailability"
                    type="text"
                    autoComplete="off"
                    value={availability}
                    onChange={onAvailabilityChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-phone">
                    Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="cyberSecurityTutor-phone"
                    name="cyberSecurityTutorPhone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-email">
                    Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="cyberSecurityTutor-email"
                    name="cyberSecurityTutorEmail"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-expertise">
                    Expertise:</label>
                <input
                    className={`form__input ${validExpertiseClass}`}
                    id="cyberSecurityTutor-expertise"
                    name="cyberSecurityTutorExpertise"
                    type="text"
                    autoComplete="off"
                    value={expertise}
                    onChange={onExpertiseChanged}
                />

            </form>
        </>
    )

    return content
}

export default NewCyberSecurityTutorForm