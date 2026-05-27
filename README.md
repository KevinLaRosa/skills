# Custom AI Agent Skills

This repository contains custom skills for AI coding agents (such as Antigravity, Claude Code, and others) conforming to the [agentskills.io](https://agentskills.io/) standard.

## Directory Structure

```text
.
├── package.json          # Package config for global link
├── bin/
│   └── skills.ts         # Command-Line Installer script (TypeScript)
└── skills/               # Reusable agent skills
    └── facturation-api/  # Facturation.pro API Skill
        ├── SKILL.md
        └── references/
            └── api_reference.md
```

## CLI Usage

You can use the local installer script with **Bun** to list and install skills.

### Listing available skills

```bash
bun bin/skills.ts list
```

### Installing a skill

By default, skills are installed to the **project scope** (under `./.agents/skills/`):

```bash
bun bin/skills.ts install <skill-name>
```

#### Options:

- **Global Install (`-g` or `--global`):** Installs the skill globally for all projects in your user config (`~/.gemini/config/skills/`):
  ```bash
  bun bin/skills.ts install <skill-name> --global
  ```

- **Custom Directory (`--skills-dir <path>`):** Installs the skill to a specific directory path:
  ```bash
  bun bin/skills.ts install <skill-name> --skills-dir /path/to/custom/dir
  ```

---

## Global CLI installation (Optional)

To make the `skills` command available globally in your terminal, run `bun link` (or `npm link`) from the root of this repository:

```bash
cd /Users/Roger/Developer/skills
bun link
```

Once linked, you can run the commands directly from anywhere:

```bash
skills list
skills install facturation-api         # Installs locally in current directory
skills install facturation-api -g      # Installs globally in ~/.gemini/config/skills/
```
