import React from 'react';
import type { Comestibilidad, Nutricion } from '../types';
import {
  COMESTIBILIDAD_LABELS,
  NUTRICION_LABELS,
  COMESTIBILIDAD_BADGE,
  NUTRICION_BADGE,
} from '../types';

interface BadgeProps {
  value: Comestibilidad | Nutricion;
  type: 'comestibilidad' | 'nutricion';
}

const Badge: React.FC<BadgeProps> = ({ value, type }) => {
  const label =
    type === 'comestibilidad'
      ? COMESTIBILIDAD_LABELS[value as Comestibilidad]
      : NUTRICION_LABELS[value as Nutricion];
  const cls =
    type === 'comestibilidad'
      ? COMESTIBILIDAD_BADGE[value as Comestibilidad]
      : NUTRICION_BADGE[value as Nutricion];

  return <span className={`badge ${cls}`}>{label}</span>;
};

export default Badge;
