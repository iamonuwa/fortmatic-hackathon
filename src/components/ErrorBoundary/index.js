import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    console.log("An error occured ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>An error occured.</h3>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
