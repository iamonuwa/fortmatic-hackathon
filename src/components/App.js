import React, { Component } from "react";
import Fortmatic from "fortmatic";
import Web3 from "web3";

import Toast from "./Toast";

import Profile from "./Profile";

const fortmatic = new Fortmatic("pk_test_B395AD580D9ADEA6");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      account: "",
      showToast: false,
      level: "success",
      message: ""
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount = async () => {
    window.web3 = new Web3(fortmatic.getProvider());
    let isUserLoggedIn = await fortmatic.user.isLoggedIn();
    if (isUserLoggedIn) {
      window.web3.eth.getAccounts((error, accounts) => {
        this.setState({
          account: accounts[0]
        });
      });
    }
    this.setState({
      isLoggedIn: isUserLoggedIn
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    let isUserLoggedIn = await fortmatic.user.isLoggedIn();
    this.setState({
      isLoggedIn: isUserLoggedIn
    });
  };

  showToast = e => {
    e.preventDefault();
    this.setState(
      {
        showToast: true
      },
      () => {
        setTimeout(() => this.setState({ showToast: false }), 3000);
      }
    );
  };

  login = async () => {
    await fortmatic.user
      .login()
      .then(account => {
        this.setState({
          account
        });
      })
      .catch(err => {
        console.log("Fortmatic Error ", err);
        this.setState({
          showToast: true,
          message: err.message,
          level: "danger"
        });
      });
  };

  logout = async () => {
    console.log("Closing");
    await fortmatic.user.logout();
  };

  render() {
    return (
      <div>
        <div className="container text-center mt-4">
          <h2 className="heading">Identity Manager</h2>
          {this.state.isLoggedIn && <Profile account={this.state.account} />}

          {!this.state.isLoggedIn && (
            <a
              title="Sign In"
              onClick={() => this.login()}
              href="#"
              className="floating-button"
            >
              <i className="fa fa-lock fa-2x" />
            </a>
          )}
          {this.state.isLoggedIn && (
            <a
              title="Sign Out"
              onClick={() => this.logout()}
              href="#"
              className="floating-button"
            >
              <i className="fa fa-unlock fa-2x" />
            </a>
          )}
        </div>
        <Toast
          level={this.state.level}
          message={this.state.message}
          visible={this.state.showToast}
        />
      </div>
    );
  }
}

export default App;
