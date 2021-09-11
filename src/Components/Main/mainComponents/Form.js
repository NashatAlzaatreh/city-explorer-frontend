import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Forms extends React.Component {
  callHandleSubmit = (e) => {
    this.props.handleSubmit(e);
  };
  callHandleLocationNameChange = (e) => {
    this.props.handleLocationNameChange(e);
  };

  render() {
    return (
      <div className={"search-bar"}>
        <Form onSubmit={this.callHandleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter city name"
              onChange={this.callHandleLocationNameChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>
      </div>
    );
  }
}

export default Forms;
