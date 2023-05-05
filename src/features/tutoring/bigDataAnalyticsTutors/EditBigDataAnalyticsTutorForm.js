import { useState, useEffect } from "react";
import { useUpdateBigDataAnalyticsTutorMutation, useDeleteBigDataAnalyticsTutorMutation } from "./bigDataAnalyticsTutorApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";

const EditBigDataAnalyticsTutorForm = ({ bigDataAnalyticsTutor, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateBigDataAnalyticsTutor, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateBigDataAnalyticsTutorMutation()

    const [deleteBigDataAnalyticsTutor, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteBigDataAnalyticsTutorMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(bigDataAnalyticsTutor.name)
    const [tutorID, setTutorID] = useState(bigDataAnalyticsTutor.tutorID)
    const [availability, setAvailability] = useState(bigDataAnalyticsTutor.availability)
    const [phone, setPhone] = useState(bigDataAnalyticsTutor.phone)
    const [email, setEmail] = useState(bigDataAnalyticsTutor.email)
    const [expertise, setExpertise] = useState(bigDataAnalyticsTutor.expertise)
    const [userId, setUserId] = useState(bigDataAnalyticsTutor.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setTutorID('')
            setAvailability('')
            setPhone('')
            setEmail('')
            setExpertise('')
            navigate('/dash/bigDataAnalyticsTutors')
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

    const onSaveBigDataAnalyticsTutorClicked = async (e) => {
        if (canSave) {
            await updateBigDataAnalyticsTutor({
                id: bigDataAnalyticsTutor.id, 
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

    const onDeleteBigDataAnalyticsTutorClicked = async (e) => {
        await deleteBigDataAnalyticsTutor({ id: bigDataAnalyticsTutor.id })
    }

    const created = new Date(bigDataAnalyticsTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    // const updated = new Date(bigDataAnalyticsTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

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
                onClick={onDeleteBigDataAnalyticsTutorClicked}
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
                    <h2>Edit Tutor #{bigDataAnalyticsTutor.name}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveBigDataAnalyticsTutorClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>

                <label className="form__label" htmlFor="bigDataAnalyticsTutor-name">
                    Tutor Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="bigDataAnalyticsTutor-name"
                    name="bigDataAnalyticsTutorName"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="bigDataAnalyticsTutor-tutorID"> Tutor ID:</label>
                <input
                    className={`form__input ${validTutorIDClass}`}
                    id="bigDataAnalyticsTutor-tutorID"
                    name="bigDataAnalyticsTutorID"
                    type="text"
                    autoComplete="off"
                    value={tutorID}
                    onChange={onTutorIDChanged}
                />

                <label className="form__label" htmlFor="bigDataAnalyticsTutor-availability"> Availability:</label>
                <input
                    className={`form__input ${validAvailabilityClass}`}
                    id="bigDataAnalyticsTutor-availability"
                    name="bigDataAnalyticsTutorAvailability"
                    type="text"
                    autoComplete="off"
                    value={availability}
                    onChange={onAvailabilityChanged}
                />

                <label className="form__label" htmlFor="bigDataAnalyticsTutor-phone"> Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="bigDataAnalyticsTutor-phone"
                    name="bigDataAnalyticsTutorPhone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="bigDataAnalyticsTutor-email"> Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="bigDataAnalyticsTutor-email"
                    name="bigDataAnalyticsTutorEmail"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="bigDataAnalyticsTutor-expertise"> Expertise:</label>
                <input
                    className={`form__input ${validExpertiseClass}`}
                    id="bigDataAnalyticsTutor-expertise"
                    name="bigDataAnalyticsTutorExpertise"
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

export default EditBigDataAnalyticsTutorForm