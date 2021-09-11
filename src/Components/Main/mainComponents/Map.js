import React from "react";
import Card from "react-bootstrap/Card";

class Map extends React.Component {
  render() {
    return (
      <div>
        <Card style={{ width: "25rem" }}>
          <Card.Img
            variant="top"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.props.lat},${this.props.lon}&zoom=13`}
            alt="Location image"
          />
          <Card.Body>
            <Card.Title>City Info: {this.props.cityName}</Card.Title>
            <Card.Text>latitude : {this.props.lat}</Card.Text>
            <Card.Text>longitude : {this.props.lon}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Map;
