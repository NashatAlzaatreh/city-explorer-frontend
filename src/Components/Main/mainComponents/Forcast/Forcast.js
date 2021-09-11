import React from "react";
import WeatherPerDay from "./WeatherPerDay";

class Forcast extends React.Component {
  render() {
    return (
      <div>
        {this.props.weatherBitData.map((item) => {
          return (
            <div>
              <WeatherPerDay
                low_temp={item.low_temp}
                max_temp={item.max_temp}
                description={item.description}
                date={item.date}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Forcast;
