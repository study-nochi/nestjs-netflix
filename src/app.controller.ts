import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {
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

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query('title') title: string) {
    if (!title) {
      return this.#movies;
    }

    return this.#movies.filter((movie) => movie.title.startsWith(title));
  }

  @Get(':id')
  getMovie(@Param('id') movieId: string) {
    const movie = this.#movies.find((movie) => movie.id === +movieId);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    return movie;
  }

  @Post()
  postMovie(@Body('title') title: string): Movie {
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

  @Patch(':id')
  patchMovie(@Param('id') movieId: string, @Body('title') title: string) {
    const movieIndex = this.#movies.findIndex((movie) => movie.id === +movieId);

    console.log(movieIndex, movieId);

    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }

    this.#movies[movieIndex].title = title;
    return this.#movies[movieIndex];
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    const movieIndex = this.#movies.findIndex((movie) => movie.id === +movieId);
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
    }
    this.#movies.splice(movieIndex, 1);
    return movieIndex;
  }
}
