import { afterEach, describe, expect, test } from 'bun:test';

// Ensure DOM globals exist BEFORE importing Testing Library's `screen`.
await import('../../../test/setup-dom');
const { cleanup, fireEvent, render, screen } = await import('@testing-library/react');

import { TopicCard } from './TopicCard';

describe('TopicCard', () => {
  afterEach(() => cleanup());

  test('renders primary + secondary actions and calls provided callbacks (external control)', () => {
    let readClicks = 0;
    let chapter5Clicks = 0;
    let chapter6Clicks = 0;

    render(
      <TopicCard
        title='Lecture 1 Notes'
        summary='Summary'
        points={['a', 'b']}
        details={<div>DETAILS</div>}
        readLabel='Read notes'
        onReadClick={() => {
          readClicks += 1;
        }}
        actions={[
          {
            label: 'Read more in Chapter 5',
            onClick: () => {
              chapter5Clicks += 1;
            },
          },
          {
            label: 'Read more in Chapter 6',
            onClick: () => {
              chapter6Clicks += 1;
            },
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Read notes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Read more in Chapter 5' }));
    fireEvent.click(screen.getByRole('button', { name: 'Read more in Chapter 6' }));

    expect(readClicks).toBe(1);
    expect(chapter5Clicks).toBe(1);
    expect(chapter6Clicks).toBe(1);

    // With external control enabled, TopicCard should not open its internal modal.
    expect(screen.queryByText('DETAILS')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
  });

  test('opens internal modal when details are provided and no onReadClick is set', async () => {
    render(<TopicCard title='T' summary='S' points={['x']} details={<div>DETAILS</div>} />);

    // Wait one tick so Modal's mounted effect can run.
    await new Promise((resolve) => setTimeout(resolve, 0));

    fireEvent.click(screen.getByRole('button', { name: 'Read' }));

    // Modal content is rendered in a portal; allow it to render.
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText('DETAILS')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
  });
});


