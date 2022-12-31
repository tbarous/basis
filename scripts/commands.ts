import { exec } from 'child_process';
import { promisify } from 'util';

const run = promisify(exec);

export async function installDeps(path: string) {
  console.log('Installing dependencies...');

  try {
    const { stdout, stderr } = await run(`cd ${path} && yarn`);

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

export async function bumpPackageVersion(path: string) {
  console.log('Bumping version...');

  try {
    const { stdout, stderr } = await run(`cd ${path} && npm version minor`);

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

export async function buildDeps(path: string) {
  console.log('Building...');

  try {
    const { stdout, stderr } = await run(`cd ${path} && yarn build`);

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

export async function publish(path: string) {
  console.log('Publishing...');

  try {
    const { stdout, stderr } = await run(`cd ${path} && npm publish`);

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
}
