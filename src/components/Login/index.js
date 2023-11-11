import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showErrorMsg: false, errorMsg: ''}

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  //   onSubmitForm = async event => {
  //     event.preventDefault()
  //     const {userId, pin} = this.state
  //     const user = {userId, pin}
  //     const url = 'https://apis.ccbp.in/ebank/login'
  //     const options = {
  //       method: 'POST',
  //       body: JSON.stringify(user),
  //     }
  //     const response = await fetch(url, options)
  //     const data = await response.json()
  //     if (response.ok) {
  //       this.onSubmitSuccess(data.jwt_token)
  //     } else {
  //       this.onSubmitFailure(data.error_msg)
  //     }
  //   }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showErrorMsg, errorMsg} = this.state
    console.log(errorMsg)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-cont">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <form className="form" onSubmit={this.submitForm}>
            <h1 className="title">Welcome Back!</h1>
            <label className="label" htmlFor="userId">
              USER ID
            </label>
            <input
              type="text"
              value={userId}
              placeholder="Enter User ID"
              onChange={this.onChangeUserId}
              className="box"
              id="userId"
            />
            <label className="label" htmlFor="pin">
              PIN
            </label>
            <input
              type="password"
              value={pin}
              placeholder="Enter PIN"
              onChange={this.onChangePin}
              className="box"
              id="pin"
            />
            <button type="submit" className="button-login">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
