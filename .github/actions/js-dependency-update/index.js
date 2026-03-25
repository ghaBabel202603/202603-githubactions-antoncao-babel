const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    const baseBranch = core.getInput('base-branch');
    const targetBranch = core.getInput('target-branch');
    const workingDirectory = core.getInput('working-directory');
    const ghToken = core.getInput('gh-token');
    const debug = core.getBooleanInput('debug');

    const branchRegex = /^[a-zA-Z0-9_.\-\/]+$/;
    const dirRegex = /^[a-zA-Z0-9_\-\/]+$/;

    if (!branchRegex.test(baseBranch)) {
        core.setFailed('The base branch name is invalid.');
        return;
    }
    if (!branchRegex.test(targetBranch)) {
        core.setFailed('The target branch name is invalid.');
        return;
    }
    if (!dirRegex.test(workingDirectory)) {
        core.setFailed('The working directory path is invalid.');
        return;
    }

    core.info(`Base branch: ${baseBranch}`);
    core.info(`Target branch: ${targetBranch}`);
    core.info(`Working directory: ${workingDirectory}`);

    await exec.exec('npm', ['update'], { cwd: workingDirectory });

    const gitStatusOutput = await exec.getExecOutput(
        'git', ['status', '-s', 'package*.json'], { cwd: workingDirectory }
    );

    if (gitStatusOutput.stdout) {
        core.info('There are updates available.');
    } else {
        core.info('There are no updates at this point in time.');
    }
}

run();
