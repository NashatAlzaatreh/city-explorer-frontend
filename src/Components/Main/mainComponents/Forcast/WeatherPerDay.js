import React from "react";

class WeatherPerDay extends React.Component {
  render() {
    return (
      <div>
        <p>
          "description": "Low of {this.props.low_temp}, high of{" "}
          {this.props.max_temp} with
          {this.props.description}", "date": {this.props.date}
        </p>
      </div>
    );
  }
}

export default WeatherPerDay;
