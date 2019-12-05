import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session'
import { SESSION_SECRET } from './constants';
import * as Store from 'connect-redis';
import { redis } from './redis';
import * as helmet from 'helmet';


dotenv.config()
async function bootstrap() {
  const RedisStore = Store(session);
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(session({
    store: new RedisStore({
      client: redis as any,
    }),
    name: "portfolio",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,

    },

  }))

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
