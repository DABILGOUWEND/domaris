const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// --- 0. Configuration de base ---
// Coolify gère le HTTPS, on utilise le port 3000 ou celui défini par Coolify
const port = process.env.PORT || 3000; 

// Permet de recevoir des corps de requêtes JSON (data envoyée par Angular)
app.use(express.json());

// Activer CORS pour les requêtes API (même si elles sont sur le même domaine, c'est plus sûr)
app.use(cors({
    // Autorise toutes les origines ou définissez spécifiquement votre domaine Coolify:
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));


// --- 1. Configuration PostgreSQL (Utilisation de la variable d'environnement Coolify) ---
const pool = new Pool({
    // Coolify injecte la chaîne de connexion interne ici
    connectionString: process.env.DATABASE_URL, 
    // Option SSL souvent nécessaire si Coolify met un proxy devant la DB
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') 
        ? { rejectUnauthorized: false } 
        : false
});


// --- 2. Route API PostgreSQL ---
// C'est l'endpoint que votre service Angular appelle (ex: http.post('/api/ajouter-utilisateur'))
app.post('/api/ajouter-utilisateur', async (req, res) => {
    const { nom, email } = req.body;
    
    if (!nom || !email) {
        return res.status(400).send('Nom et email sont requis.');
    }

    try {
        const query = 'INSERT INTO utilisateurs (nom, email) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [nom, email]);
        
        // Réponse envoyée à Angular
        res.status(201).json({ message: "Utilisateur ajouté avec succès!", data: result.rows[0] });

    } catch (err) {
        console.error("Erreur PostgreSQL:", err.stack);
        res.status(500).send('Erreur lors de l\'insertion des données.');
    }
});


// --- 3. Servir le Frontend Angular (après le build) ---
// IMPORTANT : Le chemin ci-dessous DOIT correspondre au dossier généré par ng build
// Vérifiez votre fichier package.json ou le contenu du dossier dist/
const angularDistFolder = 'domaris-app'; // REMPLACEZ PAR LE NOM DE VOTRE PROJET
const angularDistPath = path.join(__dirname, 'dist', angularDistFolder, 'browser');

// Servir les fichiers statiques (JS, CSS, images) depuis le dossier build
app.use(express.static(angularDistPath));

// Pour toute autre requête (route Angular), renvoyer index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(angularDistPath, 'index.html'));
});


// --- 4. Démarrage du serveur ---
app.listen(port, () => {
    console.log(`Node.js/Express Server démarré sur le port ${port}`);
});