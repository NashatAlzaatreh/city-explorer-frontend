import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Weather from "./Weather";

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
      weatherList: [],
      weatherBitData: [],
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
      const location = this.state.locationName;
      console.log(location);
      // console.log(this.state.locationName);
      // =======/// this is locationIQ block ///========
      const locIqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;
      // console.log(locIqUrl);

      const WeatherUrl = `${process.env.REACT_APP_SERVER_URL}/weather?city_name=${this.state.locationName}`;

      const locIqResponse = await axios.get(locIqUrl);

      await this.setState({
        locationData: locIqResponse.data[0],
      });
      console.log(locIqResponse.data[0]);
      // ============/// this is locationIQ block ///===============

      // ==================== weatherBit ===========================

      const weatherBitResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}`
      );
      // console.log(this.state.locationData.lon);
      // console.log(weatherBitResponse);

      await this.setState({
        weatherBitData: weatherBitResponse.data,
      });
      console.log(weatherBitResponse.data);

      // ==================== weatherBit ===========================
      // ===================== Movies ==============================

      const moviesResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/movies?city_name=${location}`
      );

      console.log(moviesResponse);

      await this.setState({
        weatherBitData: moviesResponse.data,
      });
      console.log(moviesResponse.data);

      // ===================== Movies ==============================
      // console.log(this.state.locationData.lon);
      // console.log(locIqResponse.data[0]);
      const WeatherResponse = await axios.get(WeatherUrl);

      // console.log(locIqResponse);

      // console.log(locIqResponse.data[0]);
      this.setState({
        weatherList: WeatherResponse.data,
      });
      console.log(WeatherResponse.data);
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
          <Weather
            locationInfo={this.state.locationInfo}
            locationData={this.state.locationData}
          />
        </div>

        <div>
          {this.state.isError && (
            <div className="errors">
              <h3> {this.state.errorName} </h3>
              <p>{this.state.errorMessage}</p>
            </div>
          )}
          {!this.state.isError && this.state.dataShow && (
            <div>
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
              </div>
              <div>
                {this.state.weatherList.map((item) => {
                  return (
                    <div>
                      <p>{item.date}</p>
                      <p>{item.description}</p>
                    </div>
                  );
                })}
              </div>
              <div>
                {/* {this.state.weatherBitData.map((item) => {
                  return (
                    <div>
                      <p>{item.date.data.high_temp}</p>
                      <p>{item.description.data.low_temp}</p>
                    </div>
                  );
                })} */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
