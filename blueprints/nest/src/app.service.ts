import { Injectable } from '@nestjs/common';
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readDirectory = promisify(fs.readdir);

@Injectable()
export class AppService {
  async getHello() {
    const files = await readDirectory(path.resolve(__dirname));

    console.log(files);

    return files;
  }
}
