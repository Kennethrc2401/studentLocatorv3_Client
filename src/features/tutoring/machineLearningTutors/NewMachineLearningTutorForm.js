import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewMachineLearningTutorMutation } from "./machineLearningTutorApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewMachineLearningTutorForm = ({ users }) => {

    const [addNewMachineLearningTutor, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewMachineLearningTutorMutation()

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
            navigate('/dash/machineLearningTutors')
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

    const onSaveMachineLearningTutorClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewMachineLearningTutor({ 
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

            <form className="form" onSubmit={onSaveMachineLearningTutorClicked}>
                <div className="form__title-row">
                    <h2>New Machine Learning Tutor</h2>
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
                <label className="form__label" htmlFor="machineLearningTutor-name">
                    Tutor Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="machineLearningTutor-name"
                    name="machineLearningTutorName"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-tutorID">
                    Tutor ID:</label>
                <input
                    className={`form__input ${validTutorIDClass}`}
                    id="machineLearningTutor-tutorID"
                    name="machineLearningTutorTutorID"
                    type="text"
                    autoComplete="off"
                    value={tutorID}
                    onChange={onTutorIDChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-availability">
                    Availability:</label>
                <input
                    className={`form__input ${validAvailabilityClass}`}
                    id="machineLearningTutor-availability"
                    name="machineLearningTutorAvailability"
                    type="text"
                    autoComplete="off"
                    value={availability}
                    onChange={onAvailabilityChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-phone">
                    Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="machineLearningTutor-phone"
                    name="machineLearningTutorPhone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-email">
                    Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="machineLearningTutor-email"
                    name="machineLearningTutorEmail"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-expertise">
                    Expertise:</label>
                <input
                    className={`form__input ${validExpertiseClass}`}
                    id="machineLearningTutor-expertise"
                    name="machineLearningTutorExpertise"
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

export default NewMachineLearningTutorForm;