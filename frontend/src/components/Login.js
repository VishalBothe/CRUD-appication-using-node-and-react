import React, { Component } from 'react'
import '../components/Login.css'
export class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email:"",
            password:""
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onEmailChange(e){
        this.setState({email: e.target.value})
    }
    onPasswordChange(e){
        this.setState({password:e.target.value})
    }
    onFormSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }
    
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <div className="login-form">
                            <h1>Sign in to continue</h1>
                            <form name="loginForm" onSubmit={this.onFormSubmit}>
                                <div className="form-group grp-ctrl">
                                    <label>Email</label>
                                    <input type="email" name="email" placeholder="Enter your email" onChange={this.onEmailChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" placeholder="Enter your password" onChange={this.onPasswordChange}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn-success" name="signin" >Sign in</button>
                                </div>
                                <div><a href="#">Forgot password?</a></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
