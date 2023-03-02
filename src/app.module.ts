import { env } from 'node:process';
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { ArtistsModule } from './models/artists/artists.module';
import { AlbumsModule } from './models/albums/albums.module';
import { TracksModule } from './models/tracks/tracks.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { LogModule } from "./common/logger/log.module";
import { LoggerMiddleware } from "./common/logger/log.middleware";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: false,
      synchronize: false, //env.NODE_ENV === 'development',
      logging: ['query', 'error', 'schema', 'warn', 'info', 'log'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: env.NODE_ENV !== 'development'
    }),
    LogModule.register({
      logPath: env.LOG_DIR,
      maxLogSize: env.LOG_FILE_SIZE
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
