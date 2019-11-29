import { 
  Resolver, Mutation,
 } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {

  @Mutation( )
  async signup(){}
  
}
