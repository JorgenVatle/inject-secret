import FS from 'fs';
import { promisify as Promisify } from 'util';

export default {
    readFile: Promisify(FS.readFile),
    writeFile: Promisify(FS.writeFile),
}