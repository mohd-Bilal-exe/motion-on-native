import { ReactElement, ReactNode } from 'react';
export type ComponentKey = string | number;
type WithAnimationId = {
    animationId?: string | number;
};
export declare const getChildKey: (child: React.ReactElement<WithAnimationId>) => ComponentKey;
export declare function onlyElements(children: ReactNode): ReactElement<any>[];
export {};
