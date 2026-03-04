import type * as React from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'body1' | 'body2';

export const variantConfig: Record<
  TypographyVariant,
  {
    as: React.ElementType;
    className: string;
  }
> = {
  h1: {
    as: 'h1',
    className: 'scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl',
  },
  h2: {
    as: 'h2',
    className: 'scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl md:text-4xl',
  },
  h3: {
    as: 'h3',
    className: 'scroll-m-20 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl',
  },
  h4: {
    as: 'h4',
    className: 'scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl',
  },
  h5: {
    as: 'h5',
    className: 'scroll-m-20 text-base font-semibold tracking-tight sm:text-lg',
  },
  h6: {
    as: 'h6',
    className: 'scroll-m-20 text-sm font-semibold tracking-tight sm:text-base',
  },
  paragraph: {
    as: 'p',
    className: 'leading-7 [&:not(:first-child)]:mt-4 text-sm sm:text-base',
  },
  body1: {
    as: 'p',
    className: 'text-sm leading-relaxed sm:text-base',
  },
  body2: {
    as: 'p',
    className: 'text-xs leading-relaxed text-muted-foreground sm:text-sm',
  },
};
