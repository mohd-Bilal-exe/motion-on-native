import { Children, isValidElement, ReactElement, ReactNode } from 'react';

export type ComponentKey = string | number;
type WithAnimationId = {
  animationId?: string | number;
};

export const getChildKey = (child: React.ReactElement<WithAnimationId>): ComponentKey => {
  return child.props.animationId ?? child.key ?? '';
};

export function onlyElements(children: ReactNode): ReactElement<any>[] {
  const filtered: ReactElement<any>[] = [];

  // We use forEach here instead of map as map mutates the component key by preprending `.$`
  Children.forEach(children, child => {
    if (isValidElement(child)) filtered.push(child);
  });

  return filtered;
}
