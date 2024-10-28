import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const superAdminExists = await this.usersService.checkIfSuperAdminExists();

    if (superAdminExists) {
      console.log('Superadmin already exists, skipping creation');
      return;
    }

    await this.usersService.createSuperAdmin({
      name: 'superadmin',
      email: 'superadmin@mail.com',
      password: 'supersecretpassword',
    });
  }
}
