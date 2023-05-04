import { useState, useEffect } from "react";
import { useUpdateMachineLearningTutorMutation, useDeleteMachineLearningTutorMutation } from "./machineLearningTutorApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";

const EditMachineLearningTutorForm = ({ machineLearningTutor, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateMachineLearningTutor, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateMachineLearningTutorMutation()

    const [deleteMachineLearningTutor, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteMachineLearningTutorMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(machineLearningTutor.name)
    const [tutorID, setTutorID] = useState(machineLearningTutor.tutorID)
    const [availability, setAvailability] = useState(machineLearningTutor.availability)
    const [phone, setPhone] = useState(machineLearningTutor.phone)
    const [email, setEmail] = useState(machineLearningTutor.email)
    const [expertise, setExpertise] = useState(machineLearningTutor.expertise)
    const [userId, setUserId] = useState(machineLearningTutor.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setTutorID('')
            setAvailability('')
            setPhone('')
            setEmail('')
            setExpertise('')
            navigate('/dash/machineLearningTutors')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onTutorIDChanged = e => setTutorID(e.target.value)
    const onAvailabilityChanged = e => setAvailability(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onExpertiseChanged = e => setExpertise(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, tutorID, availability, phone, email, expertise, userId].every(Boolean) && !isLoading

    const onSaveMachineLearningTutorClicked = async (e) => {
        if (canSave) {
            await updateMachineLearningTutor({
                id: machineLearningTutor.id, 
                user: userId,
                name, 
                tutorID,
                availability,
                phone,
                email,
                expertise
            })
        }
    }

    const onDeleteMachineLearningTutorClicked = async (e) => {
        await deleteMachineLearningTutor({ id: machineLearningTutor.id })
    }

    const created = new Date(machineLearningTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    // const updated = new Date(machineLearningTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validTutorIDClass = !tutorID ? "form__input--incomplete" : ''
    const validAvailabilityClass = !availability ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''
    const validExpertiseClass = !expertise ? "form__input--incomplete" : ''


    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteMachineLearningTutorClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Tutor #{machineLearningTutor.name}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveMachineLearningTutorClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
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

                <label className="form__label" htmlFor="machineLearningTutor-tutorID"> Tutor ID:</label>
                <input
                    className={`form__input ${validTutorIDClass}`}
                    id="machineLearningTutor-tutorID"
                    name="machineLearningTutorID"
                    type="text"
                    autoComplete="off"
                    value={tutorID}
                    onChange={onTutorIDChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-availability"> Availability:</label>
                <input
                    className={`form__input ${validAvailabilityClass}`}
                    id="machineLearningTutor-availability"
                    name="machineLearningTutorAvailability"
                    type="text"
                    autoComplete="off"
                    value={availability}
                    onChange={onAvailabilityChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-phone"> Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="machineLearningTutor-phone"
                    name="machineLearningTutorPhone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-email"> Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="machineLearningTutor-email"
                    name="machineLearningTutorEmail"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="machineLearningTutor-expertise"> Expertise:</label>
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

export default EditMachineLearningTutorForm