import React from "react";
import Movie from "./Movie";

class Movies extends React.Component {
  render() {
    return (
      <div>
        {this.props.moviesData.map((item) => {
          return (
            <div>
              <Movie
                title={item.title}
                overview={item.overview}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
                popularity={item.popularity}
                release_date={item.release_date}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Movies;
