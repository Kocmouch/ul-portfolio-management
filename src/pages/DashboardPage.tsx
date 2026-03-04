import { Typography } from '@/components/Typography';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Route } from '@/types/app';

export type DashboardPageProps = {
  onNavigate: (route: Route) => void;
};

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <section className='flex w-full flex-col gap-6 py-4'>
      <div>
        <Typography variant='h1' className='text-balance'>
          Welcome to Portfolio Management
        </Typography>
        <Typography variant='body2' className='mt-2 max-w-2xl text-muted-foreground sm:text-sm md:text-base'>
          Use this hub during the course to access core theory, structured tools, and live calculators for portfolio
          construction, risk, and performance analysis.
        </Typography>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card
          className='cursor-pointer border-border bg-card transition hover:-translate-y-0.5 hover:border-ring hover:shadow-lg hover:shadow-black/20'
          onClick={() => onNavigate('docs')}
        >
          <CardHeader>
            <CardTitle className='text-lg'>Knowledge / Docs</CardTitle>
            <CardDescription>
              Course notes, key concepts, and worked examples for each module of the portfolio management course.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className='cursor-pointer border-border bg-card transition hover:-translate-y-0.5 hover:border-ring hover:shadow-lg hover:shadow-black/20'
          onClick={() => onNavigate('calculators')}
        >
          <CardHeader>
            <CardTitle className='text-lg'>Calculators</CardTitle>
            <CardDescription>
              Interactive tools for expected return, risk (variance / volatility), and Sharpe ratio calculations.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className='cursor-pointer border-border bg-card transition hover:-translate-y-0.5 hover:border-ring hover:shadow-lg hover:shadow-black/20'
          onClick={() => onNavigate('tools')}
        >
          <CardHeader>
            <CardTitle className='text-lg'>Tools & Resources</CardTitle>
            <CardDescription>
              Checklists, templates, and external resources to support your portfolio analysis workflow.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}


