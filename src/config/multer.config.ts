import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from 'uuid';

export function getMulterConfig(
    path: string
) {
    console.log(path);
    return {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, path);
            },
            filename: (req, file, cb) => {
                const extension = extname(file.originalname);
                const newfilename = `next_nest_ecom.${uuidv4()}${extension}`;
                cb(null, newfilename)
            }
        }),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            // if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            //     return cb(new HttpException('Only images are allowed!', HttpStatus.BAD_REQUEST), null);
            // }
            cb(null, true);
        },
        limits: { fileSize: 1024 * 1024 }
    }
}