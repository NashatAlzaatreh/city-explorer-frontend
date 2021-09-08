import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      locationData: {},
      isError: false,
      errorMessage: "",
      errorName: "",
      dataShow: false,
    };
  }

  handleLocationNameChange = (e) => {
    if (e.target.value) {
      this.setState({
        locationName: e.target.value,
      });
    } else {
      this.setState({
        isError: true,
        locationName: "",
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      dataShow: true,
    });

    try {
      // console.log(this.state.locationName);
      // =======/// this is locationIQ block ///========
      const locIqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;
      console.log(locIqUrl);

      const locIqResponse = await axios.get(locIqUrl);
      console.log(locIqResponse);
      console.log(locIqResponse.data[0]);
      this.setState({
        locationData: locIqResponse.data[0],
      });
    } catch (error) {
      if (this.state.locationName) {
        this.setState({
          isError: true,

          errorName: error.message,
          errorMessage: "Please Enter a Valid Country/City Name",
          data: "",
          locationName: "",
        });
      } else {
        this.setState({
          isError: true,

          errorName: error.message,
          errorMessage: "Please Enter a Country/City before Exploring",
          data: "",
          locationName: "",
        });
      }
    }
    // =======/// this is locationIQ block ///========
  };
  render() {
    return (
      <div>
        <h2>City Explorer</h2>
        <div className={"search-bar"}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter city name"
                onChange={this.handleLocationNameChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Explore
            </Button>
          </Form>
        </div>

        <div>
          {this.state.isError && (
            <div className="errors">
              <h3> {this.state.errorName} </h3>
              <p>{this.state.errorMessage}</p>
            </div>
          )}

          {this.state.dataShow && (
            <div>
              <Card style={{ width: "25rem" }}>
                <Card.Img
                  variant="top"
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=10`}
                  alt="Location image"
                />
                <Card.Body>
                  <Card.Title>
                    City Info: {this.state.locationData.display_name}
                  </Card.Title>
                  <Card.Text>
                    latitude : {this.state.locationData.lat}
                  </Card.Text>
                  <Card.Text>
                    longitude : {this.state.locationData.lon}
                  </Card.Text>
                </Card.Body>
              </Card>
              ;
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
