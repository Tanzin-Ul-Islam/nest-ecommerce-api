import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from "multer";
import * as path from "path";
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MulterCoreService {
    async deleteFile(filename: string, pathName: string): Promise<void> {
        const basePath = path.join(__dirname, `../../../uploads/${pathName}/`);
        const filePath = path.join(basePath, filename);
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}