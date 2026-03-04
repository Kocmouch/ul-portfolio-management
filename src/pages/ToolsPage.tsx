import { Typography } from '@/components/Typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ToolsPage() {
  return (
    <section className='flex w-full flex-col gap-6 py-4'>
      <div>
        <Typography variant='h1'>Tools & Resources</Typography>
        <Typography variant='body2' className='mt-2 max-w-2xl text-muted-foreground sm:text-sm md:text-base'>
          Use these structured tools during exercises, assignments, and exam preparation. You can later replace the placeholders
          with course-specific links and documents.
        </Typography>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='border-border bg-card'>
          <CardHeader>
            <CardTitle className='text-lg text-slate-50'>Portfolio Construction Checklist</CardTitle>
            <CardDescription>
              Step-by-step guide to define objectives, constraints, and build an investable universe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className='list-decimal space-y-1 pl-5 text-sm text-slate-200'>
              <li>Define investment horizon and risk tolerance.</li>
              <li>Specify constraints (liquidity, asset classes, ESG, etc.).</li>
              <li>Select the investable universe and data sources.</li>
              <li>Estimate expected returns, volatilities, and correlations.</li>
              <li>Run optimization / scenario analysis.</li>
            </ol>
          </CardContent>
        </Card>

        <Card className='border-border bg-card'>
          <CardHeader>
            <CardTitle className='text-lg text-slate-50'>Data & Templates</CardTitle>
            <CardDescription>Placeholders for course data sets and spreadsheet templates.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='list-disc space-y-1 pl-5 text-sm text-slate-200'>
              <li>Daily returns CSV template for multiple assets.</li>
              <li>Excel/Sheets template for mean–variance calculations.</li>
              <li>Instructions for importing data from external sources.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className='border-border bg-card md:col-span-2'>
          <CardHeader>
            <CardTitle className='text-lg text-slate-50'>External Platforms</CardTitle>
            <CardDescription>Links to any platforms, sandboxes, or terminals used in the course.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='list-disc space-y-1 pl-5 text-sm text-slate-200'>
              <li>Insert Bloomberg / Refinitiv / Quandl or other data providers here.</li>
              <li>Links to online backtesting or portfolio analytics tools.</li>
              <li>Guidelines for responsible and reproducible use of data.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
