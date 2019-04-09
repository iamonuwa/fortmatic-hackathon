import React from "react";

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    let classes = `toast ${this.props.level} `;
    classes += this.state.visible ? "visible" : "";
    return (
      <div className={classes}>
        <span>{this.props.message}</span>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }
}

export default Toast;
