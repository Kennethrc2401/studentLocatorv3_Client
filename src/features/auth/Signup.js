import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { setCredentials } from './authSlice'
// import { useSignupMutation } from './authApiSlice'
// import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'

const Signup = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [signupMutation] = useSignupMutation()
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useTitle('Student Locator: Signup')

    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (e.target.value !== confirmPassword) {
            setPasswordsMatch(false)
        } else {
            setPasswordsMatch(true)
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        if (e.target.value !== password) {
            setPasswordsMatch(false)
        } else {
            setPasswordsMatch(true)
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // const { data, error } = await signupMutation({ username, password })
            // if (error) {
            //     setErrorMessage(error.message)
            //     setLoading(false)
            //     return
            // }
            // dispatch(setCredentials(data))
            // usePersist('auth', data)
            navigate('/dash')
        } catch (err) {
            setErrorMessage(err.message)
            setLoading(false)
        }
    }

    const content = (
        <section className="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        ref={usernameRef}
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        ref={passwordRef}
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="button" onClick={handleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        ref={confirmPasswordRef}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <button type="button" onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {!passwordsMatch && (
                    <p className="error">Passwords do not match.</p>
                )}
                <div className="form-control">
                    <button type="submit" disabled={!passwordsMatch}>
                        {loading ? (
                            <PulseLoader color="#fff" size={8} margin={4} />
                        ) : (
                            'Signup'
                        )}
                    </button>
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </section>
    )

}

export default Signup