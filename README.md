# Keeper
Keeper est un fork de Google Keep pour le cours d'algo web en APP5 à Polytech Paris Sud

## Test depuis Firebase
Cette application est disponibble sur Firebase à l'adress :
https://keeper-4a3ea.firebaseapp.com

## Mise en route (en local)
Une fois dans le dossier du projet, il faut installer les dépendances du serveur web 
```
npm install
```

Après cette étape il suffit de lancer le serveur
```
npm run serve
```
Cette dernière créée une instance de serveur web qui écoute sur le port 5000. Il est possible de changer ce dernier en modifiant dans le package.json, la variable **listen_port**

## Accès à l'application
Une fois les dépendances installées et le serveur lancé, il suffit d'accéder à l'adresse **http://localhost:5000/index.html**