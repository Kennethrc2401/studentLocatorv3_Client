import { useState, useEffect } from "react";
import { useUpdateStudentRecordMutation, useDeleteStudentRecordMutation } from "./studentRecordApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditStudentRecordForm = ({ studentRecord, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateStudentRecord, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateStudentRecordMutation()

    const [deleteStudentRecord, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteStudentRecordMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(studentRecord.name)
    const [email, setEmail] = useState(studentRecord.email)
    const [phone, setPhone] = useState(studentRecord.phone)
    const [address, setAddress] = useState(studentRecord.address)
    const [expertise, setExpertise] = useState(studentRecord.expertise)
    const [userId, setUserId] = useState(studentRecord.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
            setExpertise('')
            setUserId('')
            navigate('/dash/studentRecords')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)
    const onExpertiseChanged = e => setExpertise(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, email, phone, address, expertise, userId].every(Boolean) && !isLoading

    const onSaveStudentRecordClicked = async (e) => {
        if (canSave) {
            await updateStudentRecord({
                id: studentRecord.id, 
                user: userId,
                name, 
                email, 
                phone, 
                address, 
                expertise,
            })
        }
    }

    const onDeleteStudentRecordClicked = async (e) => {
        await deleteStudentRecord({ id: studentRecord.id })
    }

    const created = new Date(studentRecord.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    // const updated = new Date(studentRecord.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

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
    const valudEmailClass = !email ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validAddressClass = !address ? "form__input--incomplete" : ''
    const validExpertiseClass = !expertise ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteStudentRecordClicked}
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
                    <h2>Edit Student Record #{studentRecord.name}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveStudentRecordClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="studentRecord-name">
                    Student Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="studentRecord-name"
                    name="studentName"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="studentRecord-email">
                    Email:</label>
                <textarea
                    className={`form__input form__input--text ${valudEmailClass}`}
                    id="studentRecord-email"
                    name="studentEmail"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="studentRecord-phone">
                    Phone:</label>
                <textarea
                    className={`form__input form__input--text ${validPhoneClass}`}
                    id="studentRecord-phone"
                    name="studentPhone"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="studentRecord-address">
                    Address:</label>
                <textarea
                    className={`form__input form__input--text ${validAddressClass}`}
                    id="studentRecord-address"
                    name="studentAddress"
                    value={address}
                    onChange={onAddressChanged}
                />

                <label className="form__label" htmlFor="studentRecord-expertise">
                    Expertise:</label>
                <textarea
                    className={`form__input form__input--text ${validExpertiseClass}`}
                    id="studentRecord-expertise"
                    name="studentExpertise"
                    value={expertise}
                    onChange={onExpertiseChanged}
                />

                {/* <div className="form__row">
                    <div className="form__divider">

                        <label className="form__label form__checkbox-container" htmlFor="studentRecord-username">
                            ASSIGNED TO:</label>
                        <select
                            id="studentRecord-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div> */}
            </form>
        </>
    )

    return content
}

export default EditStudentRecordForm