DROP TABLE IF EXISTS avis, reservation, vehicule, marque, categorie, type_vehicule, etat, message_contact, users, roles CASCADE;

CREATE TABLE roles(
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(150) NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(250) NOT NULL,
    prenom VARCHAR(250) NOT NULL, 
    email VARCHAR(250) NOT NULL, 
    tel INT NOT NULL,
    id_role INT REFERENCES roles(id)
);

CREATE TABLE message_contact(
    id SERIAL PRIMARY KEY,
    messages VARCHAR(400),
    objects VARCHAR(150),
    id_user INT REFERENCES users(id)
);

CREATE TABLE etat(
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(150)
);

CREATE TABLE type_vehicule(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150)
);

CREATE TABLE categorie(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150)
);

CREATE TABLE marque(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150)
);

CREATE TABLE couleur(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150)
)

CREATE TABLE vehicule(
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(150) NOT NULL,
    cylindre INT NOT NULL, 
    moteur VARCHAR(250) NOT NULL,
    niveau_de_bruit INT NOT NULL, 
    embrayage VARCHAR(250) NOT NULL,
    prix INT NOT NULL, 
    puissance_maxi VARCHAR(250) NOT NULL,
    photo VARCHAR(255),
    id_categorie INT REFERENCES categorie(id),
    id_type INT REFERENCES type_vehicule(id),
    id_marque INT REFERENCES marque(id),
    id_couleur INT REFERENCES couleur(id)
);

CREATE TABLE avis(
    id SERIAL PRIMARY KEY, 
    commentaire VARCHAR(450) NOT NULL,
    note INT NOT NULL,
    id_vehicule INT REFERENCES vehicule(id),
    id_user INT REFERENCES users(id)
);

CREATE TABLE reservation(
    id SERIAL PRIMARY KEY,
    date_ DATE NOT NULL,         
    time_ TIME NOT NULL, 
    id_user INT REFERENCES users(id),
    id_etat INT REFERENCES etat(id),
    id_vehicule INT REFERENCES vehicule(id)
);

