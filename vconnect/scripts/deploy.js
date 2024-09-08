const fs = require('fs-extra');
const path = require('path');

let deployPath =  '../../web-server';
let deployFolder =  '/vconnect';
let existingDir = path.join(__dirname, deployPath + deployFolder); // Existing folder to rename
let buildDir = path.join(__dirname, '../dist'); // Path to your build output
let targetDir = path.join(__dirname, deployPath + deployFolder); // New target folder after renaming

console.log('process.env.NODE_ENV -> ' + process.env.NODE_ENV);
console.log('deployPath -> ' + deployPath);
console.log('deployFolder -> ' + deployFolder);
console.log('existingDir -> ' + existingDir);
console.log('buildDir -> ' + buildDir);
console.log('targetDir -> ' + targetDir);
if(process.env.NODE_ENV !== "sit"){
    console.log("Before deployPath : " + deployPath);
    deployPath =  '../../web-server-' + process.env.NODE_ENV;
    console.log("After deployPath : " + deployPath);
    existingDir = path.join(__dirname, deployPath + deployFolder);
    buildDir = path.join(__dirname, '../dist');
    targetDir = path.join(__dirname, deployPath + deployFolder);
}
console.log('--------------------AFTER----------------------');
console.log('deployPath -> ' + deployPath);
console.log('deployFolder -> ' + deployFolder);
console.log('existingDir -> ' + existingDir);
console.log('buildDir -> ' + buildDir);
console.log('targetDir -> ' + targetDir);

async function backupAnDeploy() {
    try {
        // Rename existing directory if it exists
        if (fs.existsSync(existingDir)) {
            const timestamp = new Date().toISOString().replace(/[:.-]/g, '_'); // Timestamp for uniqueness
            const renamedDir = path.join(__dirname, deployPath + deployFolder + `_${timestamp}`);
            await fs.rename(existingDir, renamedDir);
            console.log(`Renamed existing folder to ${renamedDir}`);
        }

        // Move build directory to the new target directory
        await fs.move(buildDir, targetDir, { overwrite: true });
        console.log(`Moved build files to ${targetDir}`);

        // Optionally rename the target directory (if needed)
        // const finalDirName = 'final-folder-name';
        // const finalTargetDir = path.join(__dirname, `../${finalDirName}`);
        // await fs.rename(targetDir, finalTargetDir);
        // console.log(`Renamed target folder to ${finalTargetDir}`);

    } catch (err) {
        console.error('Error during renaming and moving:', err);
    }
}

backupAnDeploy();