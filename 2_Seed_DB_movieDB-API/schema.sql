-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS translationsmoviedb;

-- Create the db
CREATE DATABASE translationsmoviedb;

-- Move into the db
\c translationsmoviedb 


-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS translations (
    id SERIAL PRIMARY KEY,
    key character varying(100),
    lang character varying(100),
    content text
);

INSERT INTO
    Translations ( key, lang, content)
VALUES
    ('0001', 'false', 'Votre commentaire ici');


-- Création de la table "comments"
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    comment text,
    Fk_translations_Id INT REFERENCES translations(id)
);

-- Insertion de données dans la table "comments"
INSERT INTO
    comments (comment, Fk_translations_Id)
VALUES
    ('Votre commentaire ici', 1);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE
    translations OWNER to postgres;