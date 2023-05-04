import { useState, useEffect } from "react";
import { 
    useUpdateMobileAppGameDevelopmentTutorMutation, 
    useDeleteMobileAppGameDevelopmentTutorMutation 
} from "./mobileAppGameDevelopmentTutorApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";

const EditMobileAppGameDevelopmentTutorForm = ({ mobileAppGameDevelopmentTutor, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateMobileAppGameDevelopmentTutor, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateMobileAppGameDevelopmentTutorMutation()

    const [deleteMobileAppGameDevelopmentTutor, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteMobileAppGameDevelopmentTutorMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(mobileAppGameDevelopmentTutor.name)
    const [tutorID, setTutorID] = useState(mobileAppGameDevelopmentTutor.tutorID)
    const [availability, setAvailability] = useState(mobileAppGameDevelopmentTutor.availability)
    const [phone, setPhone] = useState(mobileAppGameDevelopmentTutor.phone)
    const [email, setEmail] = useState(mobileAppGameDevelopmentTutor.email)
    const [expertise, setExpertise] = useState(mobileAppGameDevelopmentTutor.expertise)
    const [userId, setUserId] = useState(mobileAppGameDevelopmentTutor.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setTutorID('')
            setAvailability('')
            setPhone('')
            setEmail('')
            setExpertise('')
            navigate('/dash/mobileAppGameDevelopmentTutors')
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

    const onSaveMobileAppGameDevelopmentTutorClicked = async (e) => {
        if (canSave) {
            await updateMobileAppGameDevelopmentTutor({
                id: mobileAppGameDevelopmentTutor.id, 
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

    const onDeleteMobileAppGameDevelopmentTutorClicked = async (e) => {
        await deleteMobileAppGameDevelopmentTutor({ id: mobileAppGameDevelopmentTutor.id })
    }

    const created = new Date(mobileAppGameDevelopmentTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    // const updated = new Date(mobileAppGameDevelopmentTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

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
                onClick={onDeleteMobileAppGameDevelopmentTutorClicked}
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
                    <h2>Edit Tutor #{mobileAppGameDevelopmentTutor.name}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveMobileAppGameDevelopmentTutorClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>

                <label className="form__label" htmlFor="mobileAppGameDevelopmentTutor-name">
                    Tutor Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="mobileAppGameDevelopmentTutor-name"
                    name="mobileAppGameDevelopmentTutorName"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="mobileAppGameDevelopmentTutor-tutorID"> Tutor ID:</label>
                <input
                    className={`form__input ${validTutorIDClass}`}
                    id="mobileAppGameDevelopmentTutor-tutorID"
                    name="mobileAppGameDevelopmentTutorTutorID"
                    type="text"
                    autoComplete="off"
                    value={tutorID}
                    onChange={onTutorIDChanged}
                />

                <label className="form__label" htmlFor="mobileAppGameDevelopmentTutor-availability"> Availability:</label>
                <input
                    className={`form__input ${validAvailabilityClass}`}
                    id="mobileAppGameDevelopmentTutor-availability"
                    name="mobileAppGameDevelopmentTutorAvailability"
                    type="text"
                    autoComplete="off"
                    value={availability}
                    onChange={onAvailabilityChanged}
                />

                <label className="form__label" htmlFor="mobileAppGameDevelopmentTutor-phone"> Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="mobileAppGameDevelopmentTutor-phone"
                    name="mobileAppGameDevelopmentTutorPhone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="mobileAppGameDevelopmentTutor-email"> Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="mobileAppGameDevelopmentTutor-email"
                    name="mobileAppGameDevelopmentTutorEmail"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="mobileAppGameDevelopmentTutor-expertise"> Expertise:</label>
                <input
                    className={`form__input ${validExpertiseClass}`}
                    id="mobileAppGameDevelopmentTutor-expertise"
                    name="mobileAppGameDevelopmentTutorExpertise"
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

export default EditMobileAppGameDevelopmentTutorForm