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

You can use the local installer script with **Bun** to list and install skills to your local AI Agent configuration path (`~/.gemini/config/skills/`).

### Listing available skills

```bash
bun bin/skills.ts list
```

### Installing a skill

```bash
bun bin/skills.ts install <skill-name>
```

---

## Global CLI installation (Optional)

To make the `skills` command available globally in your terminal, run `bun link` (or `npm link`) from the root of this repository:

```bash
cd /Users/Roger/Developer/skills
bun link
```

Once linked, you can run the commands directly from anywhere (executed automatically via Bun):

```bash
skills list
skills install facturation-api
```
