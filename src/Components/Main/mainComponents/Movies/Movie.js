import React from "react";
import Card from "react-bootstrap/Card";

class Movie extends React.Component {
  render() {
    return (
      <div id="moviesDiv">
        <Card style={{ width: "20rem" }}>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w200/${this.props.poster_path}`}
          />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>overview: {this.props.overview}</Card.Text>
            <Card.Text>vote_average: {this.props.vote_average}</Card.Text>
            <Card.Text>vote_count: {this.props.vote_count}</Card.Text>
            <Card.Text>popularity: {this.props.popularity}</Card.Text>
            <Card.Text>release_date: {this.props.release_date}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Movie;
