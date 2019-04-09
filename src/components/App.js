import React, { Component } from "react";
import Fortmatic from "fortmatic";
import Web3 from "web3";

import Vote from "./Vote";

const fortmatic = new Fortmatic("pk_test_B395AD580D9ADEA6");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      account: ""
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount = async () => {
    window.web3 = new Web3(fortmatic.getProvider());
  };

  componentDidUpdate = async (prevProps, prevState) => {
    console.log(prevProps, prevState);
    let isUserLoggedIn = await fortmatic.user.isLoggedIn();
    this.setState({
      isLoggedIn: isUserLoggedIn
    });
  };

  login = async () => {
    await fortmatic.user
      .login()
      .then(account => {
        this.setState({
          account
        });
      })
      .catch(err => console.log("Fortmatic Error ", err));
  };

  logout = async () => {
    console.log("Closing");
    await fortmatic.user.logout();
  };

  render() {
    return (
      <div className="container text-center mt-4">
        <h2 className="heading">Classroom Attendance Recorder</h2>
        {this.state.isLoggedIn && <Vote />}

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
    );
  }
}

export default App;
