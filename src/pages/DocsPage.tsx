import { Typography } from '@/components/Typography';
import { TopicCard } from '@/components/docs/TopicCard';

export function DocsPage() {
  return (
    <section className='flex w-full flex-col gap-6 py-4'>
      <div>
        <Typography variant='h1'>Course Docs & Knowledge</Typography>
        <Typography variant='body2' className='mt-2 max-w-2xl text-muted-foreground sm:text-sm md:text-base'>
          High-level notes for the Portfolio Management course. You can expand or adapt these sections to your preferred teaching
          style.
        </Typography>
      </div>

      <div className='space-y-4'>
        <TopicCard
          title='1. Introduction to Portfolio Management'
          summary='Objectives of portfolio management, investment process overview, and terminology.'
          points={[
            'Role of portfolios in personal and institutional investing.',
            'Trade-off between risk and return.',
            'Diversification and why holding many assets matters.',
          ]}
        />
        <TopicCard
          title='2. Risk & Return'
          summary='Measuring returns, volatility, and understanding distributions of asset returns.'
          points={[
            'Arithmetic vs. geometric returns.',
            'Volatility as a measure of total risk.',
            'Expected return as a weighted average of scenarios.',
          ]}
        />
        <TopicCard
          title='3. CAPM & Required Return'
          summary='Using CAPM to connect systematic risk (beta) with required returns.'
          points={[
            'Market portfolio and risk-free asset.',
            'Security Market Line and interpretation.',
            'Using CAPM to derive expected/required return for an asset.',
          ]}
        />
        <TopicCard
          title='4. Efficient Frontier & Portfolio Construction'
          summary='Idea of optimal portfolios under mean–variance preferences.'
          points={[
            'Feasible set vs. efficient frontier.',
            'Impact of correlation on diversification benefits.',
            'From minimum variance to tangency portfolio.',
          ]}
        />
        <TopicCard
          title='5. Performance Evaluation'
          summary='Measuring portfolio performance and risk-adjusted returns.'
          points={[
            'Sharpe ratio and interpretation.',
            'Comparison of different portfolios or strategies.',
            'Limitations of single-period measures.',
          ]}
        />
      </div>
    </section>
  );
}
