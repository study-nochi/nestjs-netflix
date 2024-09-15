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
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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
  postMovie(@Body() body: CreateMovieDto) {
    return this.movieService.createMovie(body);
  }

  @Patch(':id')
  patchMovie(@Param('id') movieId: string, @Body() body: UpdateMovieDto) {
    return this.movieService.updateMovie(+movieId, body);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return this.movieService.deleteMovie(+movieId);
  }
}
