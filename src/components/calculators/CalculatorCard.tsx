import React, { useState } from 'react';

import TeX from '@matejmazur/react-katex';
import { ChevronDownIcon, InfoIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { getLectureAccent } from '../../configs/lectureConfig';
import { cn } from '@/lib/utils';

import type { CalculatorMeta } from './config';

interface CalculatorCardProps {
  meta: CalculatorMeta;
  children: React.ReactNode;
}

function getCategoryLabel(category: CalculatorMeta['category']): string {
  switch (category) {
    case 'return':
      return 'Return measure';
    case 'risk':
      return 'Risk measure';
    case 'performance':
      return 'Performance measure';
    case 'optimization':
      return 'Portfolio optimisation';
    default:
      return '';
  }
}

export function CalculatorCard({ meta, children }: CalculatorCardProps) {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const categoryLabel = getCategoryLabel(meta.category);

  return (
    <>
      <Card className='border-border bg-card'>
        <div
          role='button'
          tabIndex={0}
          className='flex w-full cursor-pointer items-start justify-between gap-3 px-6 pb-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
          aria-expanded={open}
        >
          <div className='space-y-1'>
            <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>{categoryLabel}</p>
            <p className='text-sm font-semibold text-slate-50'>{meta.title}</p>
            {meta.subtitle && <p className='text-xs text-muted-foreground'>{meta.subtitle}</p>}
            {meta.lecture &&
              (() => {
                const accent = getLectureAccent(meta.lecture);
                const cls = accent ? accent.className : 'bg-muted text-muted-foreground';
                const label = accent ? accent.label : meta.lecture;
                return (
                  <div className='mt-1'>
                    <Badge className={cls}>{label}</Badge>
                  </div>
                );
              })()}
          </div>
          <div className='flex items-start gap-2'>
            <Button
              type='button'
              size='icon-sm'
              variant='ghost'
              className='mt-0.5 text-muted-foreground hover:text-foreground'
              onClick={(event) => {
                event.stopPropagation();
                setInfoOpen(true);
              }}
              aria-label='More information'
            >
              <InfoIcon className='size-4' />
            </Button>
            <span className='mt-1 inline-flex items-center justify-center rounded-full border border-border/60 bg-background/60 p-1'>
              <ChevronDownIcon
                className={cn('size-3 text-muted-foreground transition-transform', open && 'rotate-180')}
                aria-hidden='true'
              />
            </span>
          </div>
        </div>
        {open && <CardContent className='pb-5 pt-1'>{children}</CardContent>}
      </Card>

      <Modal open={infoOpen} onOpenChange={setInfoOpen} title={meta.title} description={meta.subtitle ?? undefined}>
        <div className='space-y-4 pt-2'>
          <p className='text-sm text-muted-foreground'>{meta.description}</p>
          <div className='rounded-xl bg-muted/50 p-6 border border-border/50'>
            <div className='text-xl sm:text-2xl'>
              <TeX block math={meta.formulaLatex} />
            </div>
            {meta.extraLatex && (
              <div className='mt-4 pt-4 border-t border-border/30 text-sm opacity-80'>
                <TeX block math={meta.extraLatex} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
