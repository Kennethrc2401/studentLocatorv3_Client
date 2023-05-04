import { useState, useEffect } from "react";
import { useUpdateCyberSecurityTutorMutation, useDeleteCyberSecurityTutorMutation } from "./cyberSecurityTutorApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";

const EditCyberSecurityTutorForm = ({ cyberSecurityTutor, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateCyberSecurityTutor, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCyberSecurityTutorMutation()

    const [deleteCyberSecurityTutor, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCyberSecurityTutorMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(cyberSecurityTutor.name)
    const [tutorID, setTutorID] = useState(cyberSecurityTutor.tutorID)
    const [availability, setAvailability] = useState(cyberSecurityTutor.availability)
    const [phone, setPhone] = useState(cyberSecurityTutor.phone)
    const [email, setEmail] = useState(cyberSecurityTutor.email)
    const [expertise, setExpertise] = useState(cyberSecurityTutor.expertise)
    const [userId, setUserId] = useState(cyberSecurityTutor.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setTutorID('')
            setAvailability('')
            setPhone('')
            setEmail('')
            setExpertise('')
            navigate('/dash/cyberSecurityTutors')
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

    const onSaveCyberSecurityTutorClicked = async (e) => {
        if (canSave) {
            await updateCyberSecurityTutor({
                id: cyberSecurityTutor.id, 
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

    const onDeleteCyberSecurityTutorClicked = async (e) => {
        await deleteCyberSecurityTutor({ id: cyberSecurityTutor.id })
    }

    const created = new Date(cyberSecurityTutor.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    // const updated = new Date(cyberSecurityTutor.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

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
                onClick={onDeleteCyberSecurityTutorClicked}
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
                    <h2>Edit Tutor #{cyberSecurityTutor.name}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveCyberSecurityTutorClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
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

                <label className="form__label" htmlFor="cyberSecurityTutor-tutorID"> Tutor ID:</label>
                <input
                    className={`form__input ${validTutorIDClass}`}
                    id="cyberSecurityTutor-tutorID"
                    name="cyberSecurityTutorID"
                    type="text"
                    autoComplete="off"
                    value={tutorID}
                    onChange={onTutorIDChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-availability"> Availability:</label>
                <input
                    className={`form__input ${validAvailabilityClass}`}
                    id="cyberSecurityTutor-availability"
                    name="cyberSecurityTutorAvailability"
                    type="text"
                    autoComplete="off"
                    value={availability}
                    onChange={onAvailabilityChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-phone"> Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="cyberSecurityTutor-phone"
                    name="cyberSecurityTutorPhone"
                    type="text"
                    autoComplete="off"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-email"> Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="cyberSecurityTutor-email"
                    name="cyberSecurityTutorEmail"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="cyberSecurityTutor-expertise"> Expertise:</label>
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

export default EditCyberSecurityTutorForm