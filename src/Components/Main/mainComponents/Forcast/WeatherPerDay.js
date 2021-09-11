import React from "react";
import Table from "react-bootstrap/Table";

class WeatherPerDay extends React.Component {
  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>
                "description": "Low of {this.props.low_temp}, high of{" "}
                {this.props.max_temp} with
                {this.props.description}", "date": {this.props.date}
              </th>
            </tr>
          </thead>
        </Table>
      </div>
    );
  }
}

export default WeatherPerDay;
