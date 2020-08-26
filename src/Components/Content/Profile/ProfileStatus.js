import React, { Component } from "react";

export default class ProfileStatus extends Component {
  state = {
    editMode: false,
    status: this.props.status,
    error: false,
    msg: "max length is 300 symbols"
  };

  editStatus = () => {
    this.setState({
      editMode: true,
    });
  };
  changeStatus = (e) => {
    this.setState({
      status: e.target.value,
    });
    if(this.state.status.length > 300) {
      this.setState({
        error: true,
      })
    }
    if(this.state.status.length <= 300) {
      this.setState({
        error: false,
      })
    }
  };
  setStatus = () => {
    this.setState({
      editMode: false,
    });
    this.props.setStatus(this.state.status);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }
  render() {
    const {editMode, error, msg} = this.state
    const {status} = this.props
    return (
      <div>
        {editMode ? (
          <>
          <input id={error && "warning"}
            autoFocus={true}
            onChange={this.changeStatus}
            onBlur={this.setStatus}
            value={this.state.status}
          /><br/>
          <span style={{color: 'red'}}>{error &&msg}</span>
          </>
        ) : (
          <span
            className={!status ? "editStatus" : null}
            value={status}
            onClick={this.editStatus}
          >
            {status || "change status..."}
          </span>
        )}
      </div>
    );
  }
}
