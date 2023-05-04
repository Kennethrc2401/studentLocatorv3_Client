import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Student Locator!</span></h1>
            </header>
            <main className="public__main">
                <p>Easily maintain student information in a safe place.</p>
                <address className="public__addr">
                    Fairleigh Dickinson University<br />
                    1000 River Road<br />
                    Teaneck, NJ 07666<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owners: Kenneth, Rayner, Yousef</p>
            </main>
            <footer>
                <Link to="/login">Login</Link>
                {/* <Link to="/enroll">Enroll</Link</ */}
            </footer>
        </section>

    )
    return content
}
export default Public