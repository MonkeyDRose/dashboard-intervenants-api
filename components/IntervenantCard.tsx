// app/components/IntervenantCard.tsx
import React from 'react'

export type Intervenant = {
  id: number
  fullName: string
  gender?: string | null
  filiere?: string | null
  promo?: number | null
  isPole?: boolean | null
  email?: string | null
  phone?: string | null
  activitiesTotal?: number | null
  activitiesPast?: number | null
  activitiesFuture?: number | null
  totalRetribution?: number | null
  interests?: string | null
  skills?: string | null
}

type Props = {
  intervenant: Intervenant
}

export default function IntervenantCard({ intervenant }: Props) {
  const {
    fullName,
    filiere,
    promo,
    isPole,
    email,
    phone,
    interests,
    skills,
    activitiesTotal,
    activitiesPast,
    activitiesFuture,
  } = intervenant

  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-white/80 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold">{fullName}</h2>
          <p className="text-xs text-gray-600">
            {filiere ?? '—'} · {promo ?? '—'}
          </p>
        </div>
        {isPole && (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
            Pôle
          </span>
        )}
      </div>

      {(email || phone) && (
        <div className="text-xs text-gray-700">
          {email && <div>{email}</div>}
          {phone && <div>{phone}</div>}
        </div>
      )}

      {skills && (
        <p className="mt-1 text-xs">
          <span className="font-semibold">Compétences :</span> {skills}
        </p>
      )}

      {interests && (
        <p className="text-xs">
          <span className="font-semibold">Intérêts :</span> {interests}
        </p>
      )}

      {(activitiesTotal || activitiesPast || activitiesFuture) && (
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-gray-600">
          <span>Activités : {activitiesTotal ?? 0}</span>
          <span>Passées : {activitiesPast ?? 0}</span>
          <span>Futures : {activitiesFuture ?? 0}</span>
        </div>
      )}
    </div>
  )
}
