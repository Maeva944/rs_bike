CREATE DATABASE rs_bike;

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

-- Insertion des rôles
INSERT INTO roles (nom) VALUES 
('admin'), 
('user');

-- Insertion des états
INSERT INTO etat (nom) VALUES 
('Disponible'), 
('Indisponible');

-- Insertion des types de véhicules
INSERT INTO type_vehicule (nom) VALUES 
('Moto'), 
('Scooter'), 
('Voiture');

-- Insertion des catégories
INSERT INTO categorie (nom) VALUES 
('Sportive'), 
('Tourisme'), 
('Cruiser');

-- Insertion des marques
INSERT INTO marque (nom) VALUES 
('Yamaha'), 
('Honda'), 
('Kawasaki');

-- Insertion des couleurs
INSERT INTO couleur (nom) VALUES 
('Rouge'), 
('Noir'), 
('Blanc');

-- Insertion des véhicules (10 motos)
INSERT INTO vehicule (nom, cylindre, moteur, niveau_de_bruit, embrayage, prix, puissance_maxi, photo, id_categorie, id_type, id_marque, id_couleur) VALUES 
('Yamaha R1', 1000, '4 cylindres', 85, 'Manuel', 15000, '200 CV', 'yamaha_r1.jpg', 1, 1, 1, 1),
('Honda CBR600', 600, '4 cylindres', 80, 'Manuel', 11000, '130 CV', 'honda_cbr600.jpg', 1, 1, 2, 2),
('Kawasaki Z900', 900, '4 cylindres', 85, 'Manuel', 12500, '150 CV', 'kawasaki_z900.jpg', 1, 1, 3, 3),
('Yamaha MT-07', 689, '2 cylindres', 82, 'Manuel', 8500, '75 CV', 'yamaha_mt07.jpg', 1, 1, 1, 1),
('Honda CB500', 500, '2 cylindres', 75, 'Manuel', 7000, '47 CV', 'honda_cb500.jpg', 1, 1, 2, 2),
('Kawasaki Ninja 650', 649, '2 cylindres', 80, 'Manuel', 9000, '70 CV', 'kawasaki_ninja650.jpg', 1, 1, 3, 3),
('Suzuki GSX-R1000', 1000, '4 cylindres', 85, 'Manuel', 16000, '200 CV', 'suzuki_gsxr1000.jpg', 1, 1, 1, 1),
('BMW S1000RR', 999, '4 cylindres', 90, 'Manuel', 20000, '205 CV', 'bmw_s1000rr.jpg', 1, 1, 1, 2),
('Ducati Panigale V2', 955, '2 cylindres', 88, 'Manuel', 21000, '155 CV', 'ducati_panigale_v2.jpg', 1, 1, 2, 3),
('Triumph Daytona 765', 765, '3 cylindres', 85, 'Manuel', 19000, '150 CV', 'triumph_daytona765.jpg', 1, 1, 3, 3);

-- Insertion des créneaux
INSERT INTO creneaux (date_, time_, id_vehicule, is_available) VALUES 
('2025-04-20', '10:00:00', 1, TRUE),
('2025-04-20', '12:00:00', 2, TRUE),
('2025-04-21', '09:00:00', 3, TRUE),
('2025-04-21', '11:00:00', 4, TRUE),
('2025-04-22', '14:00:00', 5, TRUE),
('2025-04-22', '16:00:00', 6, TRUE),
('2025-04-23', '10:00:00', 7, TRUE),
('2025-04-23', '12:00:00', 8, TRUE),
('2025-04-24', '09:00:00', 9, TRUE),
('2025-04-24', '11:00:00', 10, TRUE);
