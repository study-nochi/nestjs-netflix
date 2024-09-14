import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Movie, MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  getMovies(@Query('title') title: string) {
    return this.movieService.getManyMovies(title);
  }

  @Get(':id')
  getMovie(@Param('id') movieId: string) {
    return this.movieService.getMovieById(+movieId);
  }

  @Post()
  postMovie(@Body('title') title: string): Movie {
    return this.movieService.createMovie(title);
  }

  @Patch(':id')
  patchMovie(@Param('id') movieId: string, @Body('title') title: string) {
    return this.movieService.updateMovie(+movieId, title);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return this.movieService.deleteMovie(+movieId);
  }
}
