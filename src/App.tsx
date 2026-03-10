import { type ReactNode, useEffect, useState } from 'react';

import { SiteNavbar } from '@/components/SiteNavbar';
import type { Theme, Route } from '@/types/app';
import { clearAuth, hasAuthCookie, setAuthCookie } from '@/lib/auth';
import { LandingPage, DashboardPage, DocsPage, ToolsPage, CalculatorsPage, PredictiveToolsPage } from '@/pages';

import './index.css';

const ROUTE_HASH_KEY = 'pm_route';
const BASE_PATH = '/portfolio-management';
const ROUTES: Route[] = ['dashboard', 'docs', 'tools', 'calculators', 'predictive'];

const getRouteFromSearch = (search: string): Route => {
  const params = new URLSearchParams(search);
  const page = params.get('page');
  if (page && ROUTES.includes(page as Route)) {
    return page as Route;
  }
  return 'landing';
};

function getInitialRoute(): Route {
  if (typeof window === 'undefined') return 'landing';

  const initial = getRouteFromSearch(window.location.search);
  if (initial !== 'landing') {
    return initial;
  }

  const stored = window.localStorage.getItem(ROUTE_HASH_KEY) as Route | null;
  if (stored && ROUTES.includes(stored)) {
    return stored;
  }

  return 'landing';
}

export function App() {
  const [route, setRoute] = useState<Route>(getInitialRoute);
  const [isAuthed, setIsAuthed] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  // On first load, check if we already have an auth cookie.
  useEffect(() => {
    // Redirect hash-based URLs (e.g. /#dashboard) to pathname-based URLs (/dashboard)

    if (hasAuthCookie()) {
      setIsAuthed(true);
      setRoute((current) => {
        // If we came in with a specific route (e.g. from pathname or localStorage), keep it;
        // otherwise default authenticated users to dashboard.
        if (current === 'landing') return 'dashboard';
        return current;
      });
    }
  }, []);

  // Initialize theme from localStorage or prefers-color-scheme.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('pm_theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  // Apply theme to the document and keep it in sync with localStorage.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem('pm_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Handle back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setRoute(getInitialRoute());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const handleAuthenticated = (remember: boolean) => {
    setIsAuthed(true);
    setAuthCookie(remember);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    clearAuth();
    setIsAuthed(false);
    handleNavigate('landing');
  };

  const handleNavigate = (next: Route) => {
    setRoute(next);
    if (typeof window !== 'undefined') {
      try {
        const nextPath = next === 'landing' ? BASE_PATH : `${BASE_PATH}/?page=${next}`;
        window.history.pushState({}, '', nextPath);

        if (next === 'landing') {
          window.localStorage.removeItem(ROUTE_HASH_KEY);
        } else {
          window.localStorage.setItem(ROUTE_HASH_KEY, next);
        }
      } catch {
        // ignore
      }
    }
  };

  const protectedRoute = (page: ReactNode) => {
    if (!isAuthed) {
      return <LandingPage onAuthenticated={handleAuthenticated} />;
    }
    return (
      <div className='flex min-h-screen w-full flex-col bg-background text-foreground'>
        <SiteNavbar
          currentRoute={route}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className='mx-auto flex w-full max-w-5xl flex-1 px-4 pb-12 pt-6'>{page}</main>
      </div>
    );
  };

  if (route === 'landing' && !isAuthed) {
    return (
      <div className='min-h-screen w-full bg-background text-foreground'>
        <div className='mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10'>
          <LandingPage onAuthenticated={handleAuthenticated} />
        </div>
      </div>
    );
  }

  switch (route) {
    case 'dashboard':
      return protectedRoute(<DashboardPage onNavigate={handleNavigate} />);
    case 'docs':
      return protectedRoute(<DocsPage />);
    case 'tools':
      return protectedRoute(<ToolsPage />);
    case 'calculators':
      return protectedRoute(<CalculatorsPage />);
    case 'predictive':
      return protectedRoute(<PredictiveToolsPage />);
    default:
      return protectedRoute(<DashboardPage onNavigate={handleNavigate} />);
  }
}
export default App;
