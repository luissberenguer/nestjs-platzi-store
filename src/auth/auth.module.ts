import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          signOptions: {
            expiresIn: '10d',
          },
          secret: configService.jwtSecret,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController, AuthController],
})
export class AuthModule {}
