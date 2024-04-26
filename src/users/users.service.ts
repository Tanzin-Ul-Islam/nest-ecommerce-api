import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { JwtAuthService } from 'src/core/jwt/jwt-auth.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTransformer } from 'src/transformers/user.transformer';
import { MailService } from 'src/core/mail/mail.service';
import { constants } from 'src/utils/constants.utils';
import { MulterCoreService } from 'src/core/multer/multer-core.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailService: MailService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly multerCoreService: MulterCoreService,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) { }

  async findAll(findUserDto: FindUserDto) {
    try {
      const { type } = findUserDto;
      const users = await this.userRepository.find({ type: type });
      return {
        success: true,
        message: "Data fetched successfully.",
        data: users,
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async profile(id: string) {
    try {
      if (!id) {
        throw new Error("Id required.");
      }
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return {
        success: true,
        message: "User data fetched successfully.",
        data: userTransformer(user),
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto, file: any) {
    try {
      if (!updateUserDto.name && !file) {
        throw new Error("Nothing to update.")
      }
      const user = await this.userRepository.findOne({ _id: id });
      if (!user) {
        throw new Error("User not found!")
      }
      if (file && file?.image?.length > 0) {
        updateUserDto.image = `${constants.baseImageUrl}/profile-image/${file.image[0].filename}`
      }
      const update = await this.userRepository.updateOne({ _id: id }, { ...updateUserDto });
      if (update.modifiedCount && file?.image?.length > 0 && user.image) {
        const prevFilename = user.image.split('/').pop();
        await this.multerCoreService.deleteFile(prevFilename, 'profile-image');
      }
      return {
        success: true,
        message: "User profile updated successfully.",
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string){
    try{
      const user = await this.userRepository.findById(id);
      if(!user){
        throw new Error("User not found.");
      }
      if(user.deleted){
        throw new Error("User already deleted");
      }
      const res = await this.userRepository.updateOne({_id: id}, {deleted: true});
      return{
        success: true,
        message: "User deleted successfully."
      }
    }catch(error){
      throw new Error(error)
    }
  }
}

