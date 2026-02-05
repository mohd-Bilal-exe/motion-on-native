'use client';

import { useEffect, useLayoutEffect } from 'react';
export const isBrowser = typeof window !== 'undefined';
// For mobile probaby just be busing useEffecct
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
