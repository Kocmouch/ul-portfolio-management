import * as React from 'react';

import { cn } from '@/lib/utils';
import type { TypographyVariant } from './typographyConfig';
import { variantConfig } from './typographyConfig';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
}

export function Typography({ variant = 'body1', className, ...props }: TypographyProps) {
  const config = variantConfig[variant];
  const Comp = config.as;

  return <Comp className={cn(config.className, className)} {...props} />;
}
