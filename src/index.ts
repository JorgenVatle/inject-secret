import * as Workflow from '@actions/core';
import Path from 'path';
import Filesystem from './Utility/Filesystem';
import { Injections } from './Interfaces/Injection';

/**
 * Inject an array of values into the given filepath.
 */
async function injectIntoTarget(targetPath: string, injections: Injections): Promise<void> {
    let subject: string = await Filesystem.readFile(targetPath, 'utf8');

    injections.forEach(({ key, value }) => {
        subject = subject.replace(`__${key}__`, value);
    });

    return Filesystem.writeFile(targetPath, subject);
}

(async () => {
    const targetPath = Path.join(process.env.GITHUB_WORKSPACE!, Workflow.getInput('target'));
    const injections = Workflow.getInput('replace')
        .split(' ') // Separate replacement targets by space.
        .map((injection) => { // Convert a key value pair from KEY=value to a JS object. { key: 'value' }
            const [key, value] = injection.split('=');
            return { key, value };
        });

    await injectIntoTarget(targetPath, injections);
})().catch((error) => {
    Workflow.setFailed(error.message);
});