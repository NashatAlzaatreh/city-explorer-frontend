import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div id="headerDiv">
        <h1>City Explorer</h1>

        <nav>
          <a href="#">Maps</a> <a href="#">Weather</a> <a href="#">Movies</a>
        </nav>
        <h4>
          City explorer helps you to decide where and when you should start your
          vacation, and gives you a list of Top movies you can watch{" "}
        </h4>
      </div>
    );
  }
}

export default Footer;
