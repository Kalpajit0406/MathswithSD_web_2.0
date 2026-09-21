#!/usr/bin/env node
import { execSync } from 'node:child_process';

function run(cmd, options = {}) {
  const { stdio = 'pipe', ignoreError = false } = options;
  try {
    const res = execSync(cmd, { encoding: 'utf-8', stdio });
    if (res && typeof res === 'string') {
      return res.trim();
    }
    return '';
  } catch (err) {
    if (ignoreError) return null;
    throw err;
  }
}

async function main() {
  console.log('\x1b[36m%s\x1b[0m', '🚀 Starting automated push sequence...');

  // 1. Check git status
  const status = run('git status --porcelain');
  if (!status) {
    console.log('\x1b[33m%s\x1b[0m', 'ℹ️  No changes detected in working tree. Checking if local commits need to be pushed...');
  } else {
    console.log('\x1b[34m%s\x1b[0m', '📦 Changes detected:');
    console.log(status);

    // 2. Pre-flight verification (Next.js build)
    console.log('\n\x1b[36m%s\x1b[0m', '⚙️  Running pre-flight build check (npm run build)...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('\x1b[32m%s\x1b[0m', '✅ Build check passed successfully!');
    } catch (err) {
      console.error('\x1b[31m%s\x1b[0m', '❌ Pre-flight build failed! Aborting push to prevent broken commits.');
      process.exit(1);
    }

    // 3. Stage all files
    console.log('\n\x1b[36m%s\x1b[0m', '📥 Staging all changes (git add -A)...');
    run('git add -A');

    // 4. Generate commit message
    const cliMessage = process.argv.slice(2).join(' ').trim();
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const commitMsg = cliMessage || `feat: automated update & improvements [${dateStr}]`;

    console.log('\x1b[36m%s\x1b[0m', `📝 Committing changes: "${commitMsg}"...`);
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  }

  // 5. Pull rebase to ensure sync with origin
  const currentBranch = run('git branch --show-current') || 'main';
  console.log('\n\x1b[36m%s\x1b[0m', `🔄 Syncing with origin/${currentBranch} (git pull --rebase)...`);
  try {
    execSync(`git pull --rebase origin ${currentBranch}`, { stdio: 'inherit' });
  } catch (err) {
    console.warn('\x1b[33m%s\x1b[0m', '⚠️  Could not pull --rebase (might already be up to date or cleanly tracking). Continuing...');
  }

  // 6. Push to GitHub
  console.log('\n\x1b[36m%s\x1b[0m', `🚀 Pushing to origin/${currentBranch}...`);
  try {
    execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });
    console.log('\n\x1b[32m%s\x1b[0m', `🎉 Successfully pushed all changes to GitHub (${currentBranch})!`);
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to push changes to GitHub. Please verify credentials/permissions.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('\x1b[31m%s\x1b[0m', `Unexpected error: ${err.message}`);
  process.exit(1);
});
