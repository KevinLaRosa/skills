#!/usr/bin/env bun

import fs from 'fs';
import path from 'path';
import os from 'os';

const SKILLS_DIR = path.join(import.meta.dir, '..', 'skills');
const GLOBAL_TARGET_DIR = path.join(os.homedir(), '.gemini', 'config', 'skills');
const LOCAL_TARGET_DIR = path.join(process.cwd(), '.agents', 'skills');

interface SkillMetadata {
  name: string;
  description: string;
}

interface CliOptions {
  global: boolean;
  skillsDir?: string;
}

function printHelp(): void {
  console.log(`
Usage:
  npx skills list                  - List all available skills
  npx skills install <skill-name>  - Install a skill locally in the project (default: ./.agents/skills/)
  
Options for installation:
  -g, --global                     - Install globally in user directory (~/.gemini/config/skills/)
  --skills-dir <path>              - Install in a custom directory
  
Other:
  npx skills help                  - Show this help message
`);
}

function parseFrontmatter(content: string): SkillMetadata {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) return { name: '', description: '' };
  
  const yamlText = match[1];
  const metadata: Partial<SkillMetadata> = {};
  
  yamlText.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(':').trim();
      // Remove optional quotes
      if (key === 'name' || key === 'description') {
        metadata[key] = val.replace(/^["']|["']$/g, '');
      }
    }
  });
  
  return {
    name: metadata.name || '',
    description: metadata.description || ''
  };
}

function listSkills(): void {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.log("No skills directory found.");
    return;
  }
  
  const files = fs.readdirSync(SKILLS_DIR);
  const skills: Array<{ id: string; name: string; description: string }> = [];
  
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

function copyFolderSync(from: string, to: string): void {
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

function installSkill(name: string | undefined, options: CliOptions): void {
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

  let destParentDir: string;
  let targetScope: string;

  if (options.skillsDir) {
    destParentDir = path.resolve(options.skillsDir);
    targetScope = `custom path (${destParentDir})`;
  } else if (options.global) {
    destParentDir = GLOBAL_TARGET_DIR;
    targetScope = "global (~/.gemini/config/skills/)";
  } else {
    destParentDir = LOCAL_TARGET_DIR;
    targetScope = "project scope (./.agents/skills/)";
  }

  const destPath = path.join(destParentDir, name);
  console.log(`Installing skill '${name}' to ${targetScope}...`);
  try {
    copyFolderSync(sourcePath, destPath);
    console.log(`\x1b[32mSuccessfully installed skill '${name}'!\x1b[0m`);
  } catch (err: any) {
    console.error("Failed to install skill:", err.message);
    process.exit(1);
  }
}

function parseArgs(args: string[]) {
  const options: CliOptions = { global: false };
  const commandArgs: string[] = [];
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-g' || arg === '--global') {
      options.global = true;
    } else if (arg === '--skills-dir') {
      const next = args[i + 1];
      if (next && !next.startsWith('-')) {
        options.skillsDir = next;
        i++;
      } else {
        console.error("Error: --skills-dir requires a directory path.");
        process.exit(1);
      }
    } else {
      commandArgs.push(arg);
    }
  }
  return { commandArgs, options };
}

const rawArgs = process.argv.slice(2);
const { commandArgs, options } = parseArgs(rawArgs);
const command = commandArgs[0];

switch (command) {
  case 'list':
  case 'ls':
    listSkills();
    break;
  case 'install':
  case 'add':
    installSkill(commandArgs[1], options);
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
