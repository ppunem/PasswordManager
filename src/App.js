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
    searchInput: '',
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
      isClicked: false,
      letterClassName: letterContainerStyling,
    }

    this.setState(prevState => ({
      newPasswordList: [...prevState.newPasswordList, newPassword],
      website: '',
      username: '',
      password: '',
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
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  removeComment = Id => {
    const {newPasswordList} = this.state
    const filteredPasswords = newPasswordList.filter(each => each.id !== Id)
    this.setState({newPasswordList: filteredPasswords})
  }

  renderNewComment = () => {
    const {newPasswordList, isClicked} = this.state

    return newPasswordList.map(eachPassword => (
      <div className="container">
        <div className={eachPassword.letterClassName}>
          {eachPassword.userName.slice(0, 1)}
        </div>
        <div className="details-container">
          <p className="details-styling">{eachPassword.websiteName}</p>
          <p className="details-styling">{eachPassword.userName}</p>
          <p className="details-styling">
            {!isClicked ? (
              <img
                className="stars-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
                alt="stars"
              />
            ) : (
              eachPassword.Password
            )}
          </p>
        </div>
        <button
          type="button"
          className="del-btn"
          onClick={() => this.removeComment(eachPassword.id)}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="del-image"
          />
        </button>
      </div>
    ))
  }

  filterPasswords = event => {
    const {newPasswordList} = this.state

    const filteredList = newPasswordList.filter(each =>
      each.userName.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({
      newPasswordList: filteredList,
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      newPasswordList,
      username,
      website,
      password,
      searchInput,
    } = this.state
    const LENGTH = newPasswordList.length

    return (
      <div className="main-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="inner-container">
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
                  value={website}
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
                  value={username}
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
                  value={password}
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
                <p className="count-container">{newPasswordList.length}</p>
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
                  value={searchInput}
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
            {LENGTH > 0 ? (
              <ul>{this.renderNewComment()}</ul>
            ) : (
              <div className="no-password-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-image"
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
