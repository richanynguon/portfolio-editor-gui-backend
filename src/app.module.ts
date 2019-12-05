import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from './config/typeOrmConfig';
import { ProjectModule } from './project/project.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      cors: {
        origin: true,
        credentials: true
      },
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({req,res }),
    }),
    UserModule,
    ProjectModule,
    ProfileModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
