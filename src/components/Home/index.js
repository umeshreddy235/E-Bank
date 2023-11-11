import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const logoutClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div className="home-cont">
      <nav className="navbar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo"
        />
        <button className="logout" type="button" onClick={logoutClicked}>
          Logout
        </button>
      </nav>
      <h1 className="home-title">Your FLexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="card"
      />
    </div>
  )
}
export default Home
