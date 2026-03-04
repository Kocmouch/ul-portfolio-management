import { Button } from '@/components/ui/button';
import { Typography } from '@/components/Typography';
import type { Theme, Route } from '@/types/app';

export type SiteNavbarProps = {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
};

export function SiteNavbar({ currentRoute, onNavigate, onLogout, theme, onToggleTheme }: SiteNavbarProps) {
  const navButton = (id: Route, label: string) => {
    const isActive = currentRoute === id;
    return (
      <Button
        key={id}
        type='button'
        variant={isActive ? 'secondary' : 'ghost'}
        size='sm'
        className='px-3'
        onClick={() => onNavigate(id)}
      >
        {label}
      </Button>
    );
  };

  return (
    <header className='border-b border-border bg-card/80 backdrop-blur'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-3'>
        <div className='flex flex-col'>
          <Typography
            variant='body2'
            className='text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-xs'
          >
            Kocmouch
          </Typography>
          <Typography variant='body1' className='text-sm font-semibold'>
            Portfolio Management · Course Hub
          </Typography>
        </div>
        <div className='flex items-center gap-2'>
          {navButton('dashboard', 'Dashboard')}
          {navButton('docs', 'Docs')}
          {navButton('tools', 'Tools')}
          {navButton('calculators', 'Calculators')}
          <Button type='button' variant='ghost' size='sm' className='px-2' aria-label='Toggle theme' onClick={onToggleTheme}>
            {theme === 'dark' ? '☾' : '☀︎'}
          </Button>
          <Button type='button' variant='outline' size='sm' onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
