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

export interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query('title') title: string) {
    return this.appService.getManyMovies(title);
  }

  @Get(':id')
  getMovie(@Param('id') movieId: string) {
    return this.appService.getMovieById(+movieId);
  }

  @Post()
  postMovie(@Body('title') title: string): Movie {
    return this.appService.createMovie(title);
  }

  @Patch(':id')
  patchMovie(@Param('id') movieId: string, @Body('title') title: string) {
    return this.appService.updateMovie(+movieId, title);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return this.appService.deleteMovie(+movieId);
  }
}
