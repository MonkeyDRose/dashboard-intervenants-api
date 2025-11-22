import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();
const results = [];

fs.createReadStream('prisma/intervenants.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    for (const item of results) {
      await prisma.intervenant.create({
        data: {
          nom: item['Intervenants'],
          genre: item['Genre'],
          filiere: item['Filière'],
          promo: item['Promo'],
          dansLePool: item['Dans le Pool ?'] === 'Oui',
          email: item['Email'],
          telephone: item['Téléphone'],
          nbEtudesEnCours: parseInt(item['Nombre d\'études en cours'] || '0'),
          nbEtudesTerminees: parseInt(item['Nombre d\'études terminées'] || '0'),
          nbEtudesTotal: parseInt(item['Nombre d\'études total'] || '0'),
          retributionTotale: parseFloat(item['Rétribution totale'] || '0'),
          centreInterets: item['Centre d\'intérêts'],
          competences: item['Compétences'],
        },
      });
    }
    console.log('Seed terminé ✅');
    await prisma.$disconnect();
  });
