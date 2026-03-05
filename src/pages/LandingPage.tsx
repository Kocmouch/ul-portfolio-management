import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MAGIC_PASSWORD = 'password';

export type LandingPageProps = {
  onAuthenticated: (remember: boolean) => void;
};

export function LandingPage({ onAuthenticated }: LandingPageProps) {
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === MAGIC_PASSWORD) {
      setError(null);
      onAuthenticated(rememberMe);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className='relative z-10 w-full max-w-xl'>
      <Card className='border-border bg-card shadow-xl shadow-black/20 backdrop-blur'>
        <CardHeader className='gap-3'>
          <CardTitle className='text-balance text-3xl font-semibold tracking-tight'>Portfolio Management</CardTitle>
          <CardDescription className='text-balance'>
            Course hub for docs, tools, and calculators. Enter the course password to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='course-password'>Magic password</Label>
              <Input
                id='course-password'
                type='password'
                autoComplete='off'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Enter course password'
                aria-invalid={!!error}
              />
              {error && <p className='text-sm text-red-400'>{error}</p>}
            </div>
            <div className='flex items-center justify-between gap-3'>
              <label className='inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground'>
                <input
                  type='checkbox'
                  className='size-4 rounded border-border bg-background text-foreground accent-foreground'
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me on this device</span>
              </label>
              <Button type='submit' className='min-w-28'>
                Enter hub
              </Button>
            </div>
            <p className='text-xs text-muted-foreground'>
              If you do not use &quot;Remember me&quot;, access will last only for this session. Closing the tab will require the
              password again.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
