import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { MulterCoreService } from "./multer-core.service";
@Module({
    providers: [MulterCoreService],
    exports: [MulterCoreService],
    imports: [
        MulterModule.register({
            dest: './uploads'
        })
    ]
})
export class MulterCoreModule { }