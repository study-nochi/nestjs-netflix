import {
  BadRequestException,
  ClassSerializerInterceptor,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class MovieService {
  #movies: Movie[] = [];
  #idCounter = 3;

  constructor() {
    const movie1 = new Movie();
    movie1.id = 1;
    movie1.title = '해리포터';
    movie1.genre = '판타지';

    const movie2 = new Movie();
    movie2.id = 2;
    movie2.title = '반지의 제왕';
    movie2.genre = '액션';

    this.#movies.push(movie1, movie2);
  }

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

  createMovie(createMovieDto: CreateMovieDto): Movie {
    if (this.#movies.some((movie) => movie.title === createMovieDto.title)) {
      throw new BadRequestException('이미 존재하는 영화 제목입니다.');
    }

    const newMovie: Movie = {
      id: this.#idCounter++,
      ...createMovieDto,
    };

    this.#movies.push(newMovie);
    return newMovie;
  }

  updateMovie(movieId: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.#movies.find((movie) => movie.id === +movieId);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    Object.assign(movie, updateMovieDto);

    return movie;
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
