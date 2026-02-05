import { useContext } from 'react';
import { PresenceContext } from './PresenceContexts';

export function usePresenceData() {
  const context = useContext(PresenceContext);
  return context ? context.custom : undefined;
}
