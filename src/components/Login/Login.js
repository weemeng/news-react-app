const React = require("react");
const  { Dropdown } = require("semantic-ui-react");
const axios = require("../Config/axios");
require("./Login.css");

const countryOptions = [
  { key: "us", value: "us", flag: "us", text: "United States" },
  { key: "sg", value: "sg", flag: "sg", text: "Singapore" },
];
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "hihi",
      username: "super",
      password: "123456789",
      loginStatus: false,
      loginFail: false
    };
  }
  componentDidMount() {
    this.attemptGetRequest();
    axios.get("").then(res => {
      this.setState({
        data: JSON.stringify(Object(res.data))
      });
    });
  }
  setUsername = event => {
    this.setState({
      username: event.target.value
    });
  };
  setPasswword = event => {
    this.setState({
      password: event.target.value
    });
  };
  attemptGetRequest() {
    axios
      .get("/user")
      .then(res => {
        this.setState({
          loginStatus: true
        });
      })
      .catch(err => {
        console.log("User not logged in");
      });
  }

  attemptLogin() {
    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.setState({
          loginStatus: true,
          loginFail: false
        });
      })
      .catch(err => {
        console.log("AXIOS Unable to log in");
        this.setState({
          loginFail: true
        });
      });
  }

  attemptLogout() {
    axios
      .post("/user/logout")
      .then(res => {
        this.setState({
          username: "",
          password: "",
          loginStatus: false,
          loginFail: false
        });
      })
      .catch(err => {
        console.log("AXIOS Unable to log out");
        console.log(err);
      });
  }

  createNewUser() {
    axios
      .post("user/newUser", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.setState({
          loginFail: false
        });
      })
      .catch(err => {
        console.log("Unable to Create New User");
        console.log(err);
      });
  }

  handleEnterKeyPress = event => {
    if (event.key === "Enter") {
      this.attemptLogin();
    }
  };

  render() {
    return (
      <div>
        <div>
          <Dropdown
            placeholder="Select Country"
            fluid
            search
            selection
            options={countryOptions}
          />
        </div>
        <div>
          {!this.state.loginStatus ? (
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.setUsername}
                  onKeyPress={event => this.handleEnterKeyPress(event)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.setPasswword}
                  onKeyPress={event => this.handleEnterKeyPress(event)}
                />
              </div>

              <button
                type="submit"
                placeholder="attemptLogin"
                onClick={event => this.attemptLogin(event)}
              >
                Login
              </button>
              <button
                type="submit"
                placeholder="createNewUser"
                onClick={event => this.createNewUser(event)}
              >
                NewUser
              </button>
            </div>
          ) : (
            `${this.state.data}`
          )}
        </div>
        <div>
          {this.state.loginFail ? (
            "Failed To Log In"
          ) : this.state.loginStatus ? (
            <button
              type="submit"
              placeholder="attemptLogout"
              onClick={event => this.attemptLogout(event)}
              // onKeyPress={this.attemptLogout()}
            >
              Logout
            </button>
          ) : (
            "Please Log in"
          )}
        </div>
      </div>
    );
  }
}
export default Login;
