import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { getModelToken } from '@nestjs/mongoose';
import { Gender, User, UserSchema } from "../auth/schemas/user.schema";
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateDto } from './dto/update.dto';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;
  let guard: JwtGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService, {provide: getModelToken(User.name), useValue: {}}]
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
    guard = module.get<JwtGuard>(JwtGuard);
  });

  describe('profile', () => {
    const mockUser = {
      id: '123',
      username: 'test',
      number: '1234567890',
      email: 'test@test.fr',
      gender: Gender[1],
      birthdate: new Date('2002-05-05'),
      preferences: [],
      reservations: [],
    }
    it('should return user profile', async () => {

      jest.spyOn(service, 'profile').mockResolvedValueOnce(mockUser);
      const req = {
        user: {
          id: '123',
        }
      }
      expect(await controller.profile(req)).toEqual(mockUser);
    });
  })
  // describe('update', () => {
  //   it('should update the user profile', async () => {
  //     const user = {
  //       id: '123',
  //       username: 'test',
  //       number: '1234567890',
  //       email: 'test@test.fr',
  //       gender: Gender[1],
  //       birthdate: new Date('2002-05-05'),
  //       preferences: [],
  //       reservations: [],
  //     }
  //     const updatedUser = {
  //       username: null,
  //       email: 'newemail@example.com',
  //       number: '1234567890',
  //       gender: Gender[2],
  //       birthdate: new Date('1990-01-01').toString(),
  //       password: null,
  //     };
  //     const result = await controller.update({ user }, updatedUser);
  //     expect(result).toEqual({
  //       id: user.id,
  //       username: user.username,
  //       email: updatedUser.email,
  //       number: updatedUser.number,
  //       gender: updatedUser.gender,
  //       birthdate: updatedUser.birthdate,
  //       preferences: [],
  //       reservations: [],
  //     });
  //   });
  // });
  // describe('unauthorized', () => {
  //   it('should return unauthorized', async () => {
  //     const mockGuard = jest.fn().mockReturnValue(false);
  //     const module: TestingModule = await Test.createTestingModule({
  //       controllers: [ProfileController],
  //       providers: [ProfileService, {provide: getModelToken(User.name), useValue: jest.fn() }],
  //     })
  //     .overrideGuard(JwtGuard)
  //     .useValue(mockGuard)
  //     .compile();

  //     controller = module.get<ProfileController>(ProfileController);

  //     const user = {
  //       id: '123',
  //       username: 'test',
  //       number: '1234567890',
  //       email: 'test@test.fr',
  //       gender: Gender[1],
  //       birthdate: new Date('2002-05-05'),
  //       preferences: [],
  //       reservations: [],
  //     }

  //     const result = await controller.profile(user);
  //     expect(result).toEqual('Unauthorized');
  //     expect(mockGuard).toHaveBeenCalled();
  //   })
  // })
});
