import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
}

@Injectable()
export class MovieService {
  #movies: Movie[] = [
    {
      id: 1,
      title: '해리포터',
    },
    {
      id: 2,
      title: '반지의 제왕',
    },
  ];
  #idCounter = 3;

  getManyMovies(title?: string) {
    if (!title) {
      return this.#movies;
    }

    return this.#movies.filter((movie) => movie.title.startsWith(title));
  }

  getMovieById(movieId: number) {
    const movie = this.#movies.find((movie) => movie.id === +movieId);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    return movie;
  }

  createMovie(title: string): Movie {
    if (this.#movies.some((movie) => movie.title === title)) {
      throw new BadRequestException('이미 존재하는 영화 제목입니다.');
    }

    const newMovie: Movie = {
      id: this.#idCounter++,
      title: title,
    };

    this.#movies.push(newMovie);
    return newMovie;
  }

  updateMovie(movieId: number, title: string) {
    const movieIndex = this.#movies.findIndex((movie) => movie.id === +movieId);

    console.log(movieIndex, movieId);

    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    this.#movies[movieIndex].title = title;
    return this.#movies[movieIndex];
  }

  deleteMovie(movieId: number) {
    const movieIndex = this.#movies.findIndex((movie) => movie.id === +movieId);
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }
    this.#movies.splice(movieIndex, 1);
    return movieIndex;
  }
}
