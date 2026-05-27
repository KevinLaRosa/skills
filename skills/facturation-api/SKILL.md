---
name: facturation-api
description: Interagissez directement avec l'API REST de facturation.pro (MonAE.fr et MaTPE.com) à l'aide de commandes curl et de variables d'environnement.
license: Proprietary
compatibility: OS Mac, Linux, Windows (avec curl et bash)
metadata:
  author: Antigravity-Agent
  version: "1.0"
---

# Facturation.pro API Workflow

Ce skill fournit les instructions essentielles pour interagir avec l'API REST de facturation.pro (MonAE et MaTPE) via des requêtes `curl` sans surcharger votre contexte de discussion.

> [!TIP]
> Ce skill applique le principe de **Progressive Disclosure** (divulgation progressive). Pour une documentation complète et exhaustive de chaque endpoint, payload et structure de données, veuillez consulter directement le fichier de référence :
> [references/api_reference.md](file:///Users/Roger/.gemini/config/skills/facturation-api/references/api_reference.md)

---

## Configuration & Authentification

L'API requiert la définition des trois variables d'environnement suivantes dans votre environnement ou votre fichier `.env` :
- `FACTURATION_API_USER` : Votre identifiant API (Identifiant API dans l'espace client).
- `FACTURATION_API_KEY` : Votre clé API privée.
- `FACTURATION_FIRM_ID` : L'identifiant de l'entreprise (FIRM_ID).

### Vérification de la configuration
Pour tester l'authentification et récupérer la liste de vos entreprises :
```bash
curl -s -u "$FACTURATION_API_USER:$FACTURATION_API_KEY" \
  -H "X-User-Agent: Antigravity-Agent (agent@google.com)" \
  "https://www.facturation.pro/account.json"
```

---

## En-têtes standards requis

Toutes les requêtes HTTP envoyées à l'API doivent inclure :
1. L'option d'authentification : `-u "$FACTURATION_API_USER:$FACTURATION_API_KEY"`.
2. L'en-tête d'identification : `-H "X-User-Agent: VotreApp (contact@domaine.com)"` (sans accents).
3. Pour les requêtes d'écriture (POST/PATCH), l'en-tête de contenu : `-H "Content-Type: application/json; charset=utf-8"`.

---

## Commandes de Référence Rapide

### 1. Clients (Customers)
- **Lister les clients :**
  ```bash
  curl -s -u "$FACTURATION_API_USER:$FACTURATION_API_KEY" \
    -H "X-User-Agent: Antigravity-Agent (agent@google.com)" \
    "https://www.facturation.pro/firms/$FACTURATION_FIRM_ID/customers.json"
  ```
- **Créer un client :**
  ```bash
  curl -s -i -u "$FACTURATION_API_USER:$FACTURATION_API_KEY" \
    -H "X-User-Agent: Antigravity-Agent (agent@google.com)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -X POST -d '{"company_name":"Entreprise Cible","individual":false,"email":"contact@cible.com"}' \
    "https://www.facturation.pro/firms/$FACTURATION_FIRM_ID/customers.json"
  ```

### 2. Devis (Quotes)
- **Lister les devis :**
  ```bash
  curl -s -u "$FACTURATION_API_USER:$FACTURATION_API_KEY" \
    -H "X-User-Agent: Antigravity-Agent (agent@google.com)" \
    "https://www.facturation.pro/firms/$FACTURATION_FIRM_ID/quotes.json?with_details=1"
  ```
- **Créer un devis (avec lignes) :**
  ```bash
  curl -s -i -u "$FACTURATION_API_USER:$FACTURATION_API_KEY" \
    -H "X-User-Agent: Antigravity-Agent (agent@google.com)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -X POST -d '{"customer_id":CUSTOMER_ID,"title":"Devis Prestation","items":[{"position":1,"quantity":"1.0","title":"Ligne 1","unit_price":"500.00","vat":"0.20"}]}' \
    "https://www.facturation.pro/firms/$FACTURATION_FIRM_ID/quotes.json"
  ```

### 3. Factures (Invoices)
- **Lister les factures :**
  ```bash
  curl -s -u "$FACTURATION_API_USER:$FACTURATION_API_KEY" \
    -H "X-User-Agent: Antigravity-Agent (agent@google.com)" \
    "https://www.facturation.pro/firms/$FACTURATION_FIRM_ID/invoices.json?with_details=1"
  ```
- **Télécharger le PDF d'une facture :**
  ```bash
  curl -s -u "$FACTURATION_API_USER:$FACTURATION_API_KEY" \
    -H "X-User-Agent: Antigravity-Agent (agent@google.com)" \
    -o facture_INVOICE_ID.pdf \
    "https://www.facturation.pro/firms/$FACTURATION_FIRM_ID/invoices/INVOICE_ID.pdf"
  ```

---

## Gestion des Limites, Pagination et Erreurs

- **Pagination :** Lisez l'en-tête HTTP `X-Pagination` retourné dans les requêtes de liste pour connaître le nombre total de pages et d'enregistrements. Utilisez le paramètre `?page=N` pour naviguer.
- **Limites de débit :** 600 requêtes par 5 minutes / 10 000 requêtes par jour. En cas d'erreur `429 Too Many Requests`, attendez le nombre de secondes indiqué par l'en-tête `Retry-After`.
- **Détails complets :** Voir [references/api_reference.md](file:///Users/Roger/.gemini/config/skills/facturation-api/references/api_reference.md).
