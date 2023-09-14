import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const backgroundColorList = ['yellow', 'green', 'orange', 'blue', 'red']

class App extends Component {
  state = {
    newPasswordList: [],
    username: '',
    website: '',
    password: '',
    isClicked: false,
    count: 0,
  }

  addNewPassword = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const letterContainerStyling = `letter-container ${
      backgroundColorList[Math.floor(Math.random() * 5)]
    }`

    const newPassword = {
      id: v4(),
      websiteName: website,
      userName: username,
      Password: password,
      isAddClicked: false,
      letterClassName: letterContainerStyling,
    }

    this.setState(prevState => ({
      newPasswordList: [...prevState.newPasswordList, newPassword],
      website: '',
      username: '',
      password: '',
      count: prevState.count + 1,
    }))
  }

  changeWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleClickStatus = () => {
    const {isClicked} = this.state

    if (isClicked) {
      this.setState({
        passWord: `${(
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}`,
      })
    } else {
      this.setState(prevState => ({passWord: prevState.passWord}))
    }

    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  renderNewComment = () => {
    const {newPasswordList} = this.state

    return newPasswordList.map(eachPassword => (
      <div className="container">
        <div className={eachPassword.letterClassName}>
          {eachPassword.userName.slice(0, 1)}
        </div>
        <div className="details-container">
          <p className="details-styling">{eachPassword.websiteName}</p>
          <p className="details-styling">{eachPassword.userName}</p>
          <p className="details-styling">{eachPassword.Password}</p>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </div>
    ))
  }

  filterPasswords = event => {
    const {newPasswordList} = this.state

    const filteredList = newPasswordList.filter(each =>
      each.userName.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({count: filteredList.length, newPasswordList: filteredList})
  }

  render() {
    const {newPasswordList, count} = this.state
    const LENGTH = newPasswordList.length

    return (
      <div className="main-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-container">
          <form onSubmit={this.addNewPassword}>
            <h1 className="form-head">Add New Password</h1>
            <div className="logo-input-container">
              <div className="image-container">
                <img
                  className="inputImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.changeWebsiteName}
              />
            </div>
            <div className="logo-input-container">
              <div className="image-container">
                <img
                  className="inputImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.changeUsername}
              />
            </div>
            <div className="logo-input-container">
              <div className="image-container">
                <img
                  className="inputImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.changePassword}
              />
            </div>
            <div className="button-container">
              <button type="submit">Add</button>
            </div>
          </form>
          <img
            className="password-manager-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>

        <div className="bottom-container">
          <div className="count-search-container">
            <div className="text-count">
              <h1 className="count-head">Your Passwords</h1>
              <p className="count-container">{count}</p>
            </div>
            <div className="logo-search-container">
              <div className="image-container">
                <img
                  className="searchImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                className="search"
                type="search"
                placeholder="Search"
                onChange={this.filterPasswords}
              />
            </div>
          </div>
          <hr />
          <div className="showPassword-container">
            <input
              className="sp"
              type="checkbox"
              id="showPassword"
              onChange={this.toggleClickStatus}
            />
            <label htmlFor="showPassword" onClick={this.toggleClickStatus}>
              Show Passwords
            </label>
          </div>
          {LENGTH > 0
            ? `${(<ul>{this.renderNewComment()}</ul>)}`
            : `${(
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
              )}`}
        </div>
      </div>
    )
  }
}

export default App
