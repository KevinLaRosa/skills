# Custom AI Agent Skills

This repository contains custom skills for AI coding agents (such as Antigravity, Claude Code, and others) conforming to the [agentskills.io](https://agentskills.io/) standard.

## Directory Structure

```text
.
├── package.json          # Package config for global link
├── bin/
│   └── skills.js         # Command-Line Installer script
└── skills/               # Reusable agent skills
    └── facturation-api/  # Facturation.pro API Skill
        ├── SKILL.md
        └── references/
            └── api_reference.md
```

## CLI Usage

You can use the local installer script to list and install skills to your local AI Agent configuration path (`~/.gemini/config/skills/`).

### Listing available skills

```bash
node bin/skills.js list
```

### Installing a skill

```bash
node bin/skills.js install <skill-name>
```

---

## Global CLI installation (Optional)

To make the `skills` command available globally in your terminal, run `npm link` from the root of this repository:

```bash
cd /Users/Roger/Developer/skills
npm link
```

Once linked, you can run the commands directly from anywhere:

```bash
skills list
skills install facturation-api
```
