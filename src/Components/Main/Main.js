import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Forms from "./mainComponents/Form";
import Map from "./mainComponents/Map";
import Forcast from "./mainComponents/Forcast/Forcast";
import Movies from "./mainComponents/Movies/Movies";

class Main extends React.Component {
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
      moviesData: [],
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
      // ==================/// this is locationIQ block ///==================
      const locIqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;
      //   const WeatherUrl = `${process.env.REACT_APP_SERVER_URL}/weather?city_name=${this.state.locationName}`;
      const locIqResponse = await axios.get(locIqUrl);

      await this.setState({
        locationData: locIqResponse.data[0],
      });
      // ====================/// this is locationIQ block ///=========================
      // ==================== weatherBit ===========================
      const weatherBitResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}`
      );
      await this.setState({
        weatherBitData: weatherBitResponse.data,
      });
      // ==================== weatherBit ===========================
      // ===================== Movies ==============================
      const moviesResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/movies?city_name=${location}`
      );
      await this.setState({
        moviesData: moviesResponse.data,
      });
      // ===================== Movies ==============================
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
  };
  render() {
    return (
      <main>
        <Forms
          handleLocationNameChange={this.handleLocationNameChange}
          handleSubmit={this.handleSubmit}
        />

        {this.state.isError && (
          <div className="errors">
            <h3> {this.state.errorName} </h3>
            <p>{this.state.errorMessage}</p>
          </div>
        )}
        {!this.state.isError && this.state.dataShow && (
          <div>
            <Map
              lon={this.state.locationData.lon}
              lat={this.state.locationData.lat}
              cityName={this.state.locationData.display_name}
            />

            <Forcast weatherBitData={this.state.weatherBitData} />

            <Movies moviesData={this.state.moviesData} />
          </div>
        )}
      </main>
    );
  }
}

export default Main;
