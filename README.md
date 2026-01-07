# rs_bike
## Description du projet

RS_Bike est une application web de location de motos.
Elle permet aux utilisateurs de consulter les motos disponibles et d’effectuer des réservations via une interface web.

L’application repose sur une architecture multi-conteneurs orchestrée avec Docker Compose :
- un frontend développé en Vue.js pour l’interface utilisateur,
- une API backend en Node.js / Express pour la gestion des données et de la logique métier,
- une base de données PostgreSQL pour le stockage persistant des informations.

L’objectif du projet est de fournir une solution facilement déployable sur n’importe quelle machine disposant de Docker, tout en respectant les bonnes pratiques de conteneurisation, de séparation des services et de persistance des données.

## Description
Application web composée de :
- Frontend Vue.js
- Backend Node.js / Express
- Base de données PostgreSQL

Le tout est déployé via Docker Compose.

## Prérequis
- Docker >= 20.x
- Docker Compose

## Lancement
```bash
docker compose up --build




