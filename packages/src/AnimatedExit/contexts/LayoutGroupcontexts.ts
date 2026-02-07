import { createContext } from 'react';

export interface LayoutGroupContextProps {
  id?: string;
  group?: any; // NodeGroup;
  forceRender?: () => void;
}

export const LayoutGroupContext = createContext<LayoutGroupContextProps>({});
