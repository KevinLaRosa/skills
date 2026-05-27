---
name: create-skill
description: Permet à un agent d'échafauder et créer un nouveau skill standardisé conforme aux spécifications agentskills.io avec Progressive Disclosure.
license: Proprietary
compatibility: OS Mac, Linux, Windows
metadata:
  author: Antigravity-Agent
  version: "1.0"
---

# Création de Skill Standard (agentskills.io)

Ce skill fournit les directives et l'échafaudage nécessaires pour créer de nouveaux skills structurés et optimisés pour les agents IA (comme Antigravity, Claude Code, Cursor, Codex).

Il s'appuie sur le principe de **Progressive Disclosure** (divulgation progressive) pour garder le fichier d'instruction principal concis et éviter d'épuiser la fenêtre de contexte de l'IA avec des documentations brutes ou trop longues.

---

## Structure d'un Skill Cible

Lorsqu'un utilisateur vous demande de créer un nouveau skill `mon-nouveau-skill`, vous devez générer la structure suivante dans le dossier `skills/` :

```text
skills/mon-nouveau-skill/
├── SKILL.md                 # Fichier d'instructions principal (court, orienté workflow)
├── references/              # (Optionnel) Documentations détaillées, API docs, schémas
│   └── reference_detail.md
└── scripts/                 # (Optionnel) Scripts de test, automatisations ou utilitaires
    └── helper.sh
```

---

## Rôle et étapes pour l'Agent IA

Suivez ces étapes pour concevoir le skill :

### 1. Analyse des besoins et collecte des informations
Identifiez ou demandez à l'utilisateur :
*   Le **nom** (slug court en minuscules, ex: `github-actions`).
*   La **description** courte (1 phrase) pour le frontmatter.
*   Les **variables d'environnement** ou configurations nécessaires.
*   Les **commandes de référence** indispensables (ex: curl, commandes CLI).
*   La **documentation complète** (API, SDK) à stocker dans `references/`.

### 2. Rédaction du frontmatter YAML dans `SKILL.md`
Chaque `SKILL.md` doit obligatoirement commencer par un bloc YAML valide :
```yaml
---
name: nom-du-skill
description: Description courte et précise du rôle du skill.
license: Proprietary (ou MIT, etc.)
compatibility: OS supportés (ex: OS Mac, Linux, Windows)
metadata:
  author: VotreNom
  version: "1.0"
---
```

### 3. Application du Progressive Disclosure
*   **SKILL.md principal** : Ne doit pas dépasser 150 à 250 lignes. Il contient les concepts fondamentaux, les commandes rapides (Cheat Sheet) et le flux de travail général.
*   **references/** : Créez des fichiers distincts pour les documentations brutes ou volumineuses. Ajoutez toujours une alerte au début de `SKILL.md` pointant vers ces fichiers :
    > [!TIP]
    > Ce skill utilise le principe de **Progressive Disclosure**. Pour la documentation complète et détaillée, consultez :
    > [references/api_reference.md](file:///absolute/path/to/references/api_reference.md)

### 4. Directives d'écriture pour les instructions
Dans `SKILL.md`, formulez des consignes claires pour un autre agent :
*   Donnez des exemples concrets de commandes réelles et de code fonctionnel.
*   Mentionnez les variables d'environnement indispensables pour que l'agent comprenne comment s'authentifier ou configurer.
*   Indiquez comment tester ou valider que le skill fonctionne.

---

## Gabarit / Template de `SKILL.md`

Utilisez ce modèle pour générer le `SKILL.md` du nouveau skill :

```markdown
---
name: <slug-du-skill>
description: <Description succincte>
license: Proprietary
compatibility: OS Mac, Linux, Windows
metadata:
  author: Antigravity-Agent
  version: "1.0"
---

# <Nom du Skill> Workflow

Introduction rapide décrivant le but du skill.

> [!TIP]
> Ce skill applique le principe de **Progressive Disclosure**. Pour la documentation technique complète, consultez :
> [references/detail.md](file:///absolute/path/to/detail.md)

---

## Configuration & Prérequis

Définissez les variables d'environnement ou fichiers requis :
*   `VARIABLE_NAME` : Explication...

---

## Guide d'utilisation / Commandes de référence

### 1. [Action Principale 1]
Exemple de commande :
\`\`\`bash
# Commande type
\`\`\`

### 2. [Action Principale 2]
Exemple de commande :
\`\`\`bash
# Commande type
\`\`\`

---

## Bonnes Pratiques & Erreurs Courantes

*   Indiquer les limites de taux (rate limits).
*   Indiquer les erreurs courantes à gérer.
*   Indiquer comment formater les requêtes/données.
```
