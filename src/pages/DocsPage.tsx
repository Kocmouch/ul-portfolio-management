import { Typography } from '@/components/Typography';
import { TopicCard } from '@/components/docs/TopicCard';
import { Markdown } from '@/components/docs/Markdown';
import { Modal } from '@/components/ui/modal';
import { lecture01RiskAndReturnMarkdown, lecture02QuantitativeMethodsAndMarkowitzMarkdown, lecture03CapmAndAptMarkdown } from '@/content/notes';
import { chapter05RiskAndReturnMarkdown, chapter06RiskUtilityAndCapitalAllocationMarkdown, chapter07OptimalRiskyPortfoliosMarkdown, chapter08IndexModelsMarkdown, chapter09CapmMarkdown, chapter10AptAndMultifactorMarkdown } from '@/content/book/chapters';
import { useState } from 'react';

export function DocsPage() {
  const [openModal, setOpenModal] = useState<'lecture1' | 'lecture2' | 'lecture3' | 'chapter5' | 'chapter6' | 'chapter7' | 'chapter8' | 'chapter9' | 'chapter10' | null>(null);

  return (
    <section className='flex w-full flex-col gap-6 py-4'>
      <div>
        <Typography variant='h1'>Course Docs & Knowledge</Typography>
        <Typography variant='body2' className='mt-2 max-w-2xl text-muted-foreground sm:text-sm md:text-base'>
          High-level course Notes plus selected Book chapters. You can expand or adapt these sections to your preferred teaching
          style.
        </Typography>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Typography variant='h2'>Notes</Typography>
          <Typography variant='body2' className='max-w-2xl text-muted-foreground sm:text-sm md:text-base'>
            Lecture-aligned notes for quick revision. Each lecture contains core concepts, formulas, and worked examples; some link to related book chapters.
          </Typography>
        </div>

        <TopicCard
          title='Lecture 1 Notes: Risk and Return'
          summary='Rates of return (HPR), arithmetic vs geometric averages, IRR, compounding, and CAL/CML basics.'
          points={[
            'Holding-Period Return (HPR): dividend yield + capital gains yield.',
            'Arithmetic vs. geometric average returns.',
            'Dollar-weighted return (IRR), compounding (APR vs EAR), and CAL/CML basics.',
          ]}
          readLabel='Read notes'
          onReadClick={() => setOpenModal('lecture1')}
          actions={[
            {
              label: 'Read more in Chapter 5',
              onClick: () => setOpenModal('chapter5'),
            },
            {
              label: 'Read more in Chapter 6',
              onClick: () => setOpenModal('chapter6'),
            },
          ]}
        />
        <TopicCard
          title='Lecture 2 Notes: Quantitative Methods & Markowitz'
          summary='Covariance, correlation, regression, and Markowitz portfolio optimization (efficient frontier).'
          points={[
            'Covariance & correlation: how assets move together and impact portfolio variance.',
            'Regression & goodness-of-fit (R²) for return models.',
            'Markowitz optimization: efficient frontier, diversification benefits, and portfolio variance formulas.',
          ]}
          readLabel='Read notes'
          onReadClick={() => setOpenModal('lecture2')}
          actions={[
            {
              label: 'Read more in Chapter 7',
              onClick: () => setOpenModal('chapter7'),
            },
            {
              label: 'Read more in Chapter 8',
              onClick: () => setOpenModal('chapter8'),
            },
          ]}
        />
        <TopicCard
          title='Lecture 3 Notes: CAPM & Required Return'
          summary='CAPM, APT, and multifactor models — theory, empirical issues, and applications.'
          points={[
            'Market portfolio and risk-free asset; Capital Market Line (CML).',
            'Security Market Line (SML) and beta — CAPM expected return formula.',
            'Arbitrage Pricing Theory (APT) and multifactor extensions (Fama–French).',
          ]}
          readLabel='Read notes'
          onReadClick={() => setOpenModal('lecture3')}
          actions={[
            {
              label: 'Read more in Chapter 9',
              onClick: () => setOpenModal('chapter9'),
            },
            {
              label: 'Read more in Chapter 10',
              onClick: () => setOpenModal('chapter10'),
            },
          ]}
        />

          <div className='pt-2 space-y-2'>
            <Typography variant='h2'>Book chapters</Typography>
            <Typography variant='body2' className='max-w-2xl text-muted-foreground sm:text-sm md:text-base'>
              Chapter summaries and problem-set oriented notes that complement the lectures.
            </Typography>
          </div>

          <TopicCard
            title='Chapter 5: Risk and Return (Problem Sets)'
            summary='Interest rates, rates of return, HPR, risk metrics and problem-set focused examples.'
            points={[
              'Interest rates & the Fisher equation.',
              'HPR, expected return, standard deviation, and the normal distribution.',
              'Risk premium, Sharpe ratio, and options as portfolio insurance.',
            ]}
            readLabel='Read chapter'
            onReadClick={() => setOpenModal('chapter5')}
          />

          <TopicCard
            title='Chapter 6: Risk, Utility, and Capital Allocation'
            summary='Utility, risk aversion, indifference curves, and the Capital Allocation Line (CAL).'
            points={[
              'Key terms: risk premium, fair game, complete portfolio, CAL, Sharpe ratio.',
              'Utility: U = E(r) − ½Aσ²; risk-averse vs risk-neutral vs risk-lover.',
              'CAL equations, kinked CAL (borrowing vs lending), and optimal y selection.',
            ]}
            readLabel='Read chapter'
            onReadClick={() => setOpenModal('chapter6')}
          />

          <TopicCard
            title='Chapter 7: Optimal Risky Portfolios'
            summary='Construction of minimum-variance and tangency portfolios, efficient frontier, and diversification benefits.'
            points={[
              'Covariance and portfolio variance contributions.',
              'Efficient frontier and tangency (optimal risky) portfolio.',
              'Separation principle and minimum-variance portfolio.',
            ]}
            readLabel='Read chapter'
            onReadClick={() => setOpenModal('chapter7')}
          />

          <TopicCard
            title='Chapter 8: Index Models'
            summary='Single-index model, Security Characteristic Line (SCL), beta & alpha, and risk decomposition.'
            points={[
              'SCL regression: $R_i = \alpha_i + \beta_i R_M + e_i$.',
              'Systematic vs. unsystematic risk; R² interpretation.',
              'Use of index models to simplify covariance estimation.',
            ]}
            readLabel='Read chapter'
            onReadClick={() => setOpenModal('chapter8')}
          />

          <TopicCard
            title='Chapter 9: Capital Asset Pricing Model (CAPM)'
            summary='CAPM assumptions, SML/CML, beta, alpha and applications to valuation and performance.'
            points={[
              'Market portfolio and mutual fund theorem.',
              'Security Market Line: required return as a function of beta.',
              'Alpha and its interpretation for valuation/performance.',
            ]}
            readLabel='Read chapter'
            onReadClick={() => setOpenModal('chapter9')}
          />

          <TopicCard
            title='Chapter 10: APT & Multifactor Models'
            summary='Arbitrage Pricing Theory, multifactor expected returns, and well‑diversified portfolio logic.'
            points={[
              'Well‑diversified portfolios and elimination of firm‑specific risk.',
              'Multifactor expected‑return decomposition and factor premia.',
              'Surprise/revision analysis and practical arbitrage logic.',
            ]}
            readLabel='Read chapter'
            onReadClick={() => setOpenModal('chapter10')}
          />
      </div>

      <Modal
        open={openModal === 'lecture1'}
        onOpenChange={(open) => setOpenModal(open ? 'lecture1' : null)}
        title='Lecture 1 Notes: Risk and Return'
        description='Rates of return, compounding, portfolio allocation, and CAL/CML — includes formulas and examples.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={lecture01RiskAndReturnMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'lecture2'}
        onOpenChange={(open) => setOpenModal(open ? 'lecture2' : null)}
        title='Lecture 2 Notes: Introduction to Portfolio Management'
        description='Covariance, correlation, regression, Markowitz optimization, and the efficient frontier.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={lecture02QuantitativeMethodsAndMarkowitzMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'lecture3'}
        onOpenChange={(open) => setOpenModal(open ? 'lecture3' : null)}
        title='Lecture 3 Notes: CAPM & APT'
        description='CAPM, APT, and multifactor models — theory, empirical issues, and common applications.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={lecture03CapmAndAptMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'chapter5'}
        onOpenChange={(open) => setOpenModal(open ? 'chapter5' : null)}
        title='Chapter 5: Risk and Return (Problem Sets)'
        description='Interest rates, HPR, expected return, standard deviation, risk premium, Sharpe ratio, and options — problem-set focused.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={chapter05RiskAndReturnMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'chapter6'}
        onOpenChange={(open) => setOpenModal(open ? 'chapter6' : null)}
        title='Chapter 6: Risk, Utility, and Capital Allocation'
        description='Utility functions, risk aversion measures, indifference curves, and the Capital Allocation Line (CAL).' 
        contentClassName='max-w-4xl'
      >
        <Markdown content={chapter06RiskUtilityAndCapitalAllocationMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'chapter7'}
        onOpenChange={(open) => setOpenModal(open ? 'chapter7' : null)}
        title='Chapter 7: Optimal Risky Portfolios'
        description='Optimal risky portfolios, efficient frontier, separation principle, and key portfolio formulas.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={chapter07OptimalRiskyPortfoliosMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'chapter8'}
        onOpenChange={(open) => setOpenModal(open ? 'chapter8' : null)}
        title='Chapter 8: Index Models, Risk Decomposition, and Alpha'
        description='Single-index model, Security Characteristic Line (SCL), beta/alpha interpretation, and risk decomposition.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={chapter08IndexModelsMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'chapter9'}
        onOpenChange={(open) => setOpenModal(open ? 'chapter9' : null)}
        title='Chapter 9: Capital Asset Pricing Model (CAPM)'
        description='CAPM assumptions, Security Market Line (SML), beta, alpha, and practical valuation applications.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={chapter09CapmMarkdown} />
      </Modal>

      <Modal
        open={openModal === 'chapter10'}
        onOpenChange={(open) => setOpenModal(open ? 'chapter10' : null)}
        title='Chapter 10: APT & Multifactor Models'
        description='APT foundations, multifactor expected returns, surprise/revision analysis, and practical arbitrage logic.'
        contentClassName='max-w-4xl'
      >
        <Markdown content={chapter10AptAndMultifactorMarkdown} />
      </Modal>
    </section>
  );
}
