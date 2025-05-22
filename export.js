const { execSync } = require('child_process');
const fs = require('fs');

// Target path where the package should be moved
const TARGET_PATH =
  '/Users/kaaun/Desktop/work/mobile-app/node_modules/@simform_solutions/react-native-audio-waveform';

// Function to execute shell commands
function executeCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to get the latest .tgz file
function getLatestTgzFile() {
  const files = fs.readdirSync('.');
  const tgzFiles = files.filter(f => f.endsWith('.tgz'));
  if (tgzFiles.length === 0) {
    throw new Error('No .tgz file found.');
  }
  // Sort by modified time, descending
  tgzFiles.sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);
  return tgzFiles[0];
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting build process...');

    // Run the build command
    console.log('📦 Building package...');
    executeCommand('yarn build:local');

    // Find the latest .tgz file
    const tgzFile = getLatestTgzFile();
    console.log(`🗜️  Found package: ${tgzFile}`);

    // Remove any previous extracted package folder
    if (fs.existsSync('package')) {
      console.log('🧹 Removing old extracted package folder...');
      executeCommand('rm -rf package');
    }

    // Extract the .tgz file
    console.log('📦 Extracting package...');
    executeCommand(`tar -xzf ${tgzFile}`);

    // Ensure target directory exists
    console.log('📁 Ensuring target directory exists...');
    ensureDirectoryExists(TARGET_PATH);

    // Copy the contents of the extracted package folder to the target directory
    console.log('📋 Copying files to target directory...');
    executeCommand(`cp -r package/* ${TARGET_PATH}/`);

    console.log('✅ Build, extract, and move completed successfully!');
  } catch (error) {
    console.error('❌ Error during build, extract, and move process:', error);
    process.exit(1);
  }
}

// Run the main function
main();
