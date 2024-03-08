- PROJET M.E.R.N EN COURS DE DEVELOPPEMENT  
- Ce projet utilise MongoDB, Express.js, React.js et Node.js 


Backend
--------

Tout d'abord :

Créez un fichier .env dans le dossier config et entrez les lignes suivante :

```sh
PORT=5000
```

```sh
MONGODB_CONNECT_URL="Votre base de données"
```

```sh
CLIENT_URL=http://localhost:3000
```

```sh
TOKEN_SECRET= "Entrez un suite de chiffre et de lettre au choix, vous pouvez en générer sur des sites dédiés"
```


Ouvrez la console de vscode avec ctrl+ù et changez la direction avec la commande suivante :

```sh
cd backend 
```


Ensuite :

```sh
npm install 
```

Attendez que tout s'intalle.

Et lancez nodemon server dans la console :

```sh
nodemon server
```


Front end
---------

Tout d'abord créez un fichier .env contenant :

```sh
REACT_APP_API_URL=http://localhost:5000/
```
Ou autre port selon vos habitudes.


Ouvrez une seconde fenêtre dans votre console avec le "+" en haut à droite de celle-ci et changez la direction avec la commande suivante :

```sh
cd frontend
```


Faites :

```sh
npm install 
```

Et :

```sh
npm start
```

(Relancez nodemon server si vous avez déjà une DB avec des post et des utilisateurs enregistrés.)