"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Workflow = __importStar(require("@actions/core"));
const path_1 = __importDefault(require("path"));
const Filesystem_1 = __importDefault(require("./Utility/Filesystem"));
/**
 * Inject an array of values into the given filepath.
 */
async function injectIntoTarget(targetPath, injections) {
    let subject = await Filesystem_1.default.readFile(targetPath, 'utf8');
    injections.forEach(({ key, value }) => {
        subject = subject.replace(`__${key}__`, value);
    });
    return Filesystem_1.default.writeFile(targetPath, subject);
}
(async () => {
    const targetPath = path_1.default.join(process.env.GITHUB_WORKSPACE, Workflow.getInput('target'));
    const injections = Workflow.getInput('replace')
        .split(' ') // Separate replacement targets by space.
        .map((injection) => {
        const [key, value] = injection.split('=');
        return { key, value };
    });
    await injectIntoTarget(targetPath, injections);
})().catch((error) => {
    Workflow.setFailed(error.message);
});
