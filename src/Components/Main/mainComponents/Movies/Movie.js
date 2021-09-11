import React from "react";

class Movie extends React.Component {
  render() {
    return (
      <div>
        <p>title: {this.props.title}</p>
        <p>overview: {this.props.overview}</p>
        <img
          src={`https://image.tmdb.org/t/p/w200/${this.props.poster_path}`}
          alt=""
        />
        <p>vote_average: {this.props.vote_average}</p>
        <p>vote_count: {this.props.vote_count}</p>
        <p>popularity: {this.props.popularity}</p>
        <p>release_date: {this.props.release_date}</p>
      </div>
    );
  }
}

export default Movie;
