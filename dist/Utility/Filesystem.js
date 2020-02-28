"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
exports.default = {
    readFile: util_1.promisify(fs_1.default.readFile),
    writeFile: util_1.promisify(fs_1.default.writeFile),
};
