import { Link } from "react-router-dom";
function LoginPage() {
    return (
        <>
        <div className="d-flex justify-content-center align-items-center">
        <div className="container bg-light m-5 p-3 rounded" style={{backgroundColor: "#d5e4e667", width: "50%"}}>
        <h1 className="h1 text-center">Login</h1>
        <form action="">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"/>
            </div>
            <div>
                <p >Did you forgot your password?<button className="btn btn-link" data-bs-toggle="modal" data-bs-target="#forgotPassword">Forgot Password</button></p>
                <div className="modal fade" id="forgotPassword">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Forgot Password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="input-group">
                                        <span className="input-group-text">Email</span>
                                        <input type="email" className="form-control" id="email" />
                                    </div>    
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="submit" className="btn btn-primary">Confirm</button>
                                    </div>
                                    <p className="text-center mt-3 text-dark mb-3 bg-info">ℹ️You can change your password by Clicking the link that you recived via mail.</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center ">
                {/* <!-- <button type="submit" class="btn btn-primary" onclick="login()"><a href="landingPage.html" class="text-white text-decoration-none">Login</a></button> --> */}
                 <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <p>Don't have an account?<Link to="/registration">Create Account</Link></p>
            </div>
        </form>
        </div>
        </div>
        </>
    )
}

export default LoginPage;