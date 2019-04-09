import React from "react";
import data from "../../data/social";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialNetwork: "",
      handle: "",
      password: "",
      error: "",
      result: ""
    };
    this.signStore = this.signStore.bind(this);
    this.close = this.close.bind(this);
  }

  signStore = async e => {
    e.preventDefault();
    const from = this.props.account;
    const msg = [
      {
        type: "string",
        name: "socialNetwork",
        value: this.state.socialNetwork
      },
      {
        type: "string",
        name: "handle",
        value: this.state.handle.toLowerCase()
      },
      {
        type: "string",
        name: "password",
        value: this.state.password.toLowerCase()
      }
    ];

    const params = [msg, from];
    const method = "eth_signTypedData";
    window.web3.currentProvider
      .send({
        id: new Date().getTime(),
        method,
        params
      })
      .then(response => console.log("Response ", response))
      .catch(err => {
        this.setState({
          error: err
        });
        console.log(err);
      });
  };

  close = () => {
    const closeAlert = document.querySelector(".alert");
    closeAlert.classList.remove("show");
  };

  render() {
    return (
      <div className="container">
        {this.state.result && (
          <div className="alert alert-success alert-dismissible fade show">
            <span>{this.state.result}</span>
            <button
              type="button"
              className="close"
              onClick={() => this.close()}
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {this.state.error && (
          <div className="alert alert-error alert-dismissible fade show">
            <span>{this.state.result}</span>
            <button
              type="button"
              className="close"
              onClick={() => this.close()}
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <h3>
          Welcome! {this.props.account ? "This is your account" : ""}
          <a
            target="_blank"
            rel="no-opener"
            href={"https://etherscan.io/address/" + this.props.account}
          >
            {" "}
            {this.props.account}
          </a>
        </h3>

        <form className="mt-4" onSubmit={e => this.signStore(e)}>
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={e =>
                    this.setState({ socialNetwork: e.target.value })
                  }
                >
                  <option>Select Social network</option>
                  {data.map((option, index) => {
                    return <option key={index}>{option.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <input
                  placeholder="Handle"
                  type="text"
                  className="form-control"
                  onChange={e => this.setState({ handle: e.target.value })}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <input
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <button className="btn-secondary">Sign and Store</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Profile;
