import { useEffect, useMemo, useState } from 'react';

import { Typography } from '@/components/Typography';
import { CalculatorCard } from '@/components/calculators/CalculatorCard';
import { calculatorsConfig, type CalculatorCategory } from '@/components/calculators/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORY_FILTERS: { id: 'all' | CalculatorCategory; label: string }[] = [
  { id: 'all', label: 'All calculators' },
  { id: 'return', label: 'Return measures' },
  { id: 'risk', label: 'Risk measures' },
  { id: 'performance', label: 'Performance measures' },
  { id: 'optimization', label: 'Portfolio optimisation' },
];

export function CalculatorsPage() {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | CalculatorCategory>('all');

  // Persist last visited route in the URL hash (simple client-side routing support).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.location.hash = '#calculators';
    } catch {
      // ignore
    }
  }, []);

  const filteredCalculators = useMemo(() => {
    const query = filter.trim().toLowerCase();

    const byCategory = calculatorsConfig.filter((calculator) =>
      categoryFilter === 'all' ? true : calculator.category === categoryFilter
    );

    if (!query) return byCategory;

    return byCategory.filter((calculator) => {
      const haystack = [calculator.title, calculator.subtitle ?? '', calculator.category, calculator.description]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [filter, categoryFilter]);

  const leftColumn: typeof filteredCalculators = [];
  const rightColumn: typeof filteredCalculators = [];

  filteredCalculators.forEach((calculator, index) => {
    if (index % 2 === 0) {
      leftColumn.push(calculator);
    } else {
      rightColumn.push(calculator);
    }
  });

  return (
    <section className='flex w-full flex-col gap-6 py-4'>
      <div className='space-y-3'>
        <div>
          <Typography variant='h1'>Portfolio Calculators</Typography>
          <Typography variant='body2' className='mt-2 max-w-2xl text-muted-foreground sm:text-sm md:text-base'>
            Quick calculators for portfolio weights, return, risk, ROI, time-weighted and money-weighted performance, and simple
            allocation rules.
          </Typography>
        </div>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div className='max-w-xs'>
            <Input
              placeholder='Filter by name, category, or description...'
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {CATEGORY_FILTERS.map((item) => (
              <Button
                key={item.id}
                type='button'
                size='sm'
                variant={categoryFilter === item.id ? 'secondary' : 'outline'}
                onClick={() => setCategoryFilter(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-start'>
        <div className='flex-1 space-y-4'>
          {leftColumn.map((calculator) => {
            if (!calculator.component) return null;

            const CalculatorComponent = calculator.component;
            return (
              <CalculatorCard key={calculator.id} meta={calculator}>
                <CalculatorComponent />
              </CalculatorCard>
            );
          })}
        </div>
        <div className='flex-1 space-y-4'>
          {rightColumn.map((calculator) => {
            if (!calculator.component) return null;

            const CalculatorComponent = calculator.component;
            return (
              <CalculatorCard key={calculator.id} meta={calculator}>
                <CalculatorComponent />
              </CalculatorCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
