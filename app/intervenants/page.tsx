// app/intervenants/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import IntervenantCard, {
  Intervenant,
} from '@/components/IntervenantCard'

export default function IntervenantsPage() {
  const [intervenants, setIntervenants] = useState<Intervenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [filiereFilter, setFiliereFilter] = useState<string>('all')
  const [promoFilter, setPromoFilter] = useState<string>('all')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/api/intervenants')
        if (!res.ok) throw new Error('Erreur API')
        const data = await res.json()
        setIntervenants(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Impossible de charger les intervenants.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // listes uniques pour filtres
  const filieres = useMemo(
    () =>
      Array.from(
        new Set(
          intervenants
            .map((i) => i.filiere)
            .filter((f): f is string => !!f),
        ),
      ).sort(),
    [intervenants],
  )

  const promos = useMemo(
    () =>
      Array.from(
        new Set(
          intervenants
            .map((i) => i.promo)
            .filter((p): p is number => p != null),
        ),
      ).sort(),
    [intervenants],
  )

  // filtrage côté front
  const filtered = useMemo(
    () =>
      intervenants.filter((i) => {
        const q = search.toLowerCase()

        const matchesSearch =
          !q ||
          i.fullName.toLowerCase().includes(q) ||
          (i.skills ?? '').toLowerCase().includes(q) ||
          (i.interests ?? '').toLowerCase().includes(q)

        const matchesFiliere =
          filiereFilter === 'all' || i.filiere === filiereFilter

        const matchesPromo =
          promoFilter === 'all' ||
          (i.promo && String(i.promo) === promoFilter)

        return matchesSearch && matchesFiliere && matchesPromo
      }),
    [intervenants, search, filiereFilter, promoFilter],
  )

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Intervenants N7 Consulting
          </h1>
          <p className="text-sm text-gray-600">
            Liste filtrable des intervenants, alimentée en temps réel
            depuis Neon via Prisma.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Rechercher (nom, compétences, intérêts)..."
            className="w-full rounded-lg border px-3 py-1.5 text-sm md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-lg border px-2 py-1.5 text-sm"
            value={filiereFilter}
            onChange={(e) => setFiliereFilter(e.target.value)}
          >
            <option value="all">Toutes filières</option>
            {filieres.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border px-2 py-1.5 text-sm"
            value={promoFilter}
            onChange={(e) => setPromoFilter(e.target.value)}
          >
            <option value="all">Toutes promos</option>
            {promos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading && (
        <p className="text-sm text-gray-600">Chargement…</p>
      )}

      {error && !loading && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <section>
          <p className="mb-3 text-xs text-gray-500">
            {filtered.length} intervenant(s) affiché(s) sur{' '}
            {intervenants.length}
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((i) => (
              <IntervenantCard key={i.id} intervenant={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
