# Custom AI Agent Skills

This repository contains custom skills for AI coding agents (such as Antigravity, Claude Code, Cursor, and others) conforming to the [agentskills.io](https://agentskills.io/) standard.

Rather than maintaining a custom installer CLI, this repository is designed to be fully compatible with the official **`vercel-labs/skills`** CLI (package name `skills` on npm). You can discover, list, install, and update these skills seamlessly across different projects and AI agents.

---

## Directory Structure

```text
.
├── package.json          # Repository metadata
├── README.md             # Documentation
└── skills/               # Reusable agent skills
    └── facturation-api/  # Facturation.pro API Skill
        ├── SKILL.md
        └── references/
            └── api_reference.md
```

---

## Installation via Official `skills` CLI

You can install any skill from this repository using `npx skills`. The CLI automatically detects your installed AI agents (e.g. Cursor, Claude Code, Cline, etc.) and symlinks or copies the skills to their respective directories.

### 1. From the GitHub Repository (Remote)

To install a specific skill directly from GitHub:

```bash
# Install facturation-api to your current project
npx skills add KevinLaRosa/skills --skill facturation-api

# Install facturation-api globally (user-level)
npx skills add KevinLaRosa/skills --skill facturation-api -g

# Install all skills from this repository to your project
npx skills add KevinLaRosa/skills --all
```

### 2. From the Local Repository Clone

If you are developing skills locally in `/Users/Roger/Developer/skills/`, you can install them directly from your local path:

```bash
# Install facturation-api from your local clone to your current project
npx skills add /Users/Roger/Developer/skills --skill facturation-api

# Install facturation-api from your local clone globally
npx skills add /Users/Roger/Developer/skills --skill facturation-api -g
```

---

## Useful CLI Options

The official `skills` CLI supports several flags when adding skills:

*   `-g, --global`: Install the skill globally (user-level) instead of project-level.
*   `-a, --agent <agents>`: Target specific AI agents (e.g., `-a claude-code cursor` or `-a *` for all agents).
*   `-s, --skill <skills>`: Specify skill names to install (e.g., `-s facturation-api`).
*   `-y`: Non-interactive mode (skips prompts).
*   `--copy`: Copy files instead of symlinking to agent directories.
*   `--all`: Shorthand for `--skill '*' --agent '*' -y`.

---

## Managing Installed Skills

Use these commands in your project directories to manage your installed skills:

```bash
# List project-scoped skills
npx skills list

# List globally-scoped skills
npx skills list -g

# Remove a skill
npx skills remove facturation-api

# Update all installed skills to their latest versions
npx skills update
```

For more details, visit the official [vercel-labs/skills](https://github.com/vercel-labs/skills) repository or explore the ecosystem at [skills.sh](https://skills.sh).
