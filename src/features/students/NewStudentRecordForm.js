import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewStudentRecordMutation } from "./studentRecordApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewStudentRecordForm = ({ users }) => {

    const [addNewStudentRecord, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewStudentRecordMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [expertise, setExpertise] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
            setExpertise('')
            setUserId('')
            navigate('/dash/studentRecords')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)
    const onExpertiseChanged = e => setExpertise(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, email, phone, address, expertise, userId].every(Boolean) && !isLoading

    const onSaveStudentRecordClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewStudentRecord({ 
                user: userId, 
                name: name,
                email: email,
                phone: phone,
                address: address,
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
    const valudEmailClass = !email ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validAddressClass = !address ? "form__input--incomplete" : ''
    const validExpertiseClass = !expertise ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveStudentRecordClicked}>
                <div className="form__title-row">
                    <h2>New Student Record</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
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

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewStudentRecordForm