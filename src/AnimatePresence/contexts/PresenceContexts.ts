'use client';

import { createContext } from 'react';
import { PresenceContextProps } from '../types/types';

/**
 * @public
 */
export const PresenceContext = /* @__PURE__ */ createContext<PresenceContextProps | null>(null);
