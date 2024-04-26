import { Global, Module } from "@nestjs/common";
import { MailModule } from "./mail/mail.module";
import { JwtAuthModule } from "./jwt/jwt-auth.module";
import { MulterCoreModule } from "./multer/multer-core.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/users/entity/users";
import { UserRepository } from "src/users/users.repository";
import { SubCategory, SubCategorySchema } from "src/sub-category/entities/sub-category.entity";
import { Category, CategorySchema } from "src/category/entities/category.entity";

@Global()
@Module({
    imports: [
        MailModule,
        JwtAuthModule,
        MulterCoreModule,
        MongooseModule.forFeature([
            {
                name: Users.name,
                schema: UserSchema,
            },
        ])
    ],
    exports: [
        MongooseModule,
        MailModule,
        JwtAuthModule,
        MulterCoreModule,
        UserRepository,
    ],
    providers: [UserRepository]
})
export class CoreModule { }