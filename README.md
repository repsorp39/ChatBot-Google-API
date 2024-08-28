# Google Generative AI API

Cette API utilise Google Generative AI pour accepter et traiter des prompts sous forme d'image et de texte. Elle comprend des endpoints pour la gestion des utilisateurs et l'interaction avec le chatbot.

## Endpoints

### 1. Connexion/Login
- **URL**: `/connexion/login`
- **Méthode**: `POST`
- **Description**: Authentifie un utilisateur existant.
- **Corps de la requête**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }



### 2. Connexion/insc
- **URL**: `/connexion/insc`
- **Méthode**: `POST`
- **Description**: Inscrit un nouvel utilisateur.
- **Corps de la requête**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }

### 3. chatbot/historique
- **URL**: `/connexion/insc`
- **Méthode**: `POST`
- **Description**: Récupère l'historique des conversations d'un utilisateur.
- **Corps de la requête**:
  ```js
  {
    //configurer les headers authorization
  }

### 4. chatbot/new-prompt
- **URL**:  /chatbot/new-prompt
- **Méthode** POST
- **Description** Envoie un nouveau prompt texte ou image au chatbot pour une réponse générée par l'IA.
- **Corps de la requête**:

```json
{
  "prompt": "Quel est le temps aujourd'hui ?"
}

