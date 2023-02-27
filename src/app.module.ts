import { env } from 'node:process';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { ArtistsModule } from './models/artists/artists.module';
import { AlbumsModule } from './models/albums/albums.module';
import { TracksModule } from './models/tracks/tracks.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { LogModule } from "./common/logger/log.module";
import { StdoutChannel } from "./common/logger/channel/stdout.channel";
import { FileChannel } from "./common/logger/channel/file.channel";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: false,
      synchronize: env.NODE_ENV === 'development',
      logging: ['query', 'error', 'schema', 'warn', 'info', 'log'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: env.NODE_ENV !== 'development'
    }),
    LogModule.register({ channels:
      [
        new StdoutChannel(), // log everything
        new FileChannel(env.LOG_PATH, ['error']), // log errors only
        new FileChannel(env.LOG_PATH), // log everything
      ],
      maxLogSize: env.LOG_FILE_SIZE
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
