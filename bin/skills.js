#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const TARGET_DIR = path.join(os.homedir(), '.gemini', 'config', 'skills');

function printHelp() {
  console.log(`
Usage:
  npx skills list                  - List all available skills
  npx skills install <skill-name>  - Install a skill globally
  npx skills help                  - Show this help message
`);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) return { name: '', description: '' };
  
  const yamlText = match[1];
  const metadata = {};
  yamlText.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(':').trim();
      // Remove optional quotes
      metadata[key] = val.replace(/^["']|["']$/g, '');
    }
  });
  return metadata;
}

function listSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log("No skills directory found.");
    return;
  }
  
  const files = fs.readdirSync(SKILLS_DIR);
  const skills = [];
  
  files.forEach(file => {
    const fullPath = path.join(SKILLS_DIR, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const skillMdPath = path.join(fullPath, 'SKILL.md');
      if (fs.existsSync(skillMdPath)) {
        const content = fs.readFileSync(skillMdPath, 'utf8');
        const metadata = parseFrontmatter(content);
        skills.push({
          id: file,
          name: metadata.name || file,
          description: metadata.description || 'No description'
        });
      }
    }
  });

  if (skills.length === 0) {
    console.log("No skills found in repository.");
    return;
  }

  console.log("\nAvailable Skills:\n");
  skills.forEach(skill => {
    console.log(`* \x1b[32m${skill.id}\x1b[0m: ${skill.description}`);
  });
  console.log("");
}

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

function installSkill(name) {
  if (!name) {
    console.error("Error: Please specify the name of the skill to install.");
    printHelp();
    process.exit(1);
  }

  const sourcePath = path.join(SKILLS_DIR, name);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Skill '${name}' not found in repository.`);
    process.exit(1);
  }

  const destPath = path.join(TARGET_DIR, name);
  console.log(`Installing skill '${name}' to ${destPath}...`);
  try {
    copyFolderSync(sourcePath, destPath);
    console.log(`\x1b[32mSuccessfully installed skill '${name}'!\x1b[0m`);
  } catch (err) {
    console.error("Failed to install skill:", err.message);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'list':
  case 'ls':
    listSkills();
    break;
  case 'install':
  case 'add':
    installSkill(args[1]);
    break;
  case 'help':
  case '-h':
  case '--help':
    printHelp();
    break;
  default:
    if (command) {
      console.error(`Unknown command: ${command}`);
    }
    printHelp();
    process.exit(1);
}
