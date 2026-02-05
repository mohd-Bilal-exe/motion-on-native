import { createContext } from 'react';

export interface LayoutGroupContextProps {
  id?: string;
  group?: any; // NodeGroup;
  forceRender?: VoidFunction;
}

export const LayoutGroupContext = createContext<LayoutGroupContextProps>({});
