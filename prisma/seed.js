// Fichier : prisma/seed.js

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
// Assurez-vous d'avoir installé 'csv-parser' via 'npm install csv-parser'
import csv from 'csv-parser'; 

const prisma = new PrismaClient();
const results = [];

// Le fichier CSV doit être placé dans le dossier 'prisma'
fs.createReadStream('prisma/intervenants.csv') 
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    // ⚠️ OPTIONNEL MAIS FORTEMENT RECOMMANDÉ : Effacer les données existantes avant de seeder
    // Pour éviter les doublons ou erreurs si le script est exécuté plusieurs fois.
    try {
      await prisma.intervenant.deleteMany();
      console.log('Anciennes données Intervenants effacées.');
    } catch (error) {
      console.error('Erreur lors de la suppression des anciennes données:', error);
    }
    
    // --- BOUCLE D'INSERTION ---
    for (const item of results) {
      // Les clés dans 'data' (ex: Nom_Complet) DOIVENT correspondre aux champs de votre modèle Prisma.
      // Les valeurs (ex: item['nom_complet']) DOIVENT correspondre aux en-têtes de colonnes du CSV.
      await prisma.intervenant.create({
        data: {
          Nom_Complet: item['nom_complet'],
          Genre: item['genre'] || null,
          Filiere: item['filiere'] || null,
          // Conversion des chaînes en nombres (si le champ est vide, on utilise '0' pour parseInt)
          Promo: parseInt(item['promo'] || '0'), 
          // Conversion de 'true'/'false' en booléen.
          Est_Pole: item['est_pole'] === 'true', 
          Email: item['email'] || null,
          Telephone: item['telephone'] || null,
          
          Nb_Activites: parseInt(item['nb_activites'] || '0'),
          Nb_Activites_Passees: parseInt(item['nb_activites_passees'] || '0'),
          Nb_Activites_Futures: parseInt(item['nb_activites_futures'] || '0'),
          
          // Conversion en nombre décimal (Float) pour la rétribution.
          Retribution_Totale: parseFloat(item['retribution_totale'] || '0'), 
          
          Centres_Interets: item['centres_interets'] || null,
          Competences: item['competences'] || null,
        },
      });
    }
    console.log(`Seed terminé ✅. ${results.length} intervenants insérés.`);
    await prisma.$disconnect();
  });
