import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // 1. On récupère TOUTES les colonnes de la table intervenants
    const rows = await prisma.intervenant.findMany({
      orderBy: { id: 'asc' },
    })

    console.log('ROWS[0] =', rows[0])   // LOG IMPORTANT
    console.log('ALL ROWS =', rows)     // 

    // 2. On les mappe dans un format propre pour le front (camelCase)
    const data = rows.map((i) => ({
      id: i.id,
      fullName: i.Nom_Complet,
      gender: i.Genre,
      filiere: i.Filiere,
      promo: i.Promo,
      isPole: i.Est_Pole,
      email: i.Email,
      phone: i.Telephone,
      activitiesTotal: i.Nb_Activites,
      activitiesPast: i.Nb_Activites_Passees,
      activitiesFuture: i.Nb_Activites_Futures,
      totalRetribution: i.Retribution_Totale,
      interests: i.Centres_Interets,
      skills: i.Competences,
    }))

    console.log('DATA[0] =', data[0])   // 👈 2ᵉ LOG IMPORTANT

    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/intervenants] Erreur Prisma :', err)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 },
    )
  }
}

