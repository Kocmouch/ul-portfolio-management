import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AllocationHelper() {
  const [totalInput, setTotalInput] = useState('');

  const total = Number(totalInput);
  const validTotal = Number.isFinite(total) && total > 0;

  const formatAmount = (fraction: number) => {
    if (!validTotal) return '-';
    return (total * fraction).toFixed(2);
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-1'>
        <Label htmlFor='alloc-total'>Total portfolio value P_total</Label>
        <Input
          id='alloc-total'
          placeholder='e.g. 100000'
          value={totalInput}
          onChange={(event) => setTotalInput(event.target.value)}
        />
      </div>
      <div className='space-y-2 text-sm'>
        <p className='font-semibold text-muted-foreground'>60/40 portfolio</p>
        <ul className='list-disc space-y-1 pl-5'>
          <li>
            Stocks (60%): <span className='font-semibold text-emerald-500'>{formatAmount(0.6)}</span>
          </li>
          <li>
            Bonds (40%): <span className='font-semibold text-emerald-500'>{formatAmount(0.4)}</span>
          </li>
        </ul>
      </div>
      <div className='space-y-2 text-sm'>
        <p className='font-semibold text-muted-foreground'>70:20:10 rule</p>
        <ul className='list-disc space-y-1 pl-5'>
          <li>
            Low-risk (70%): <span className='font-semibold text-emerald-500'>{formatAmount(0.7)}</span>
          </li>
          <li>
            Medium-risk (20%): <span className='font-semibold text-emerald-500'>{formatAmount(0.2)}</span>
          </li>
          <li>
            High-risk (10%): <span className='font-semibold text-emerald-500'>{formatAmount(0.1)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
