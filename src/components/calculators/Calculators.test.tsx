import { describe, test, expect } from 'bun:test';

await import('../../../test/setup-dom');
const { render, screen, fireEvent } = await import('@testing-library/react');

import { ArithmeticAverageCalculator } from './ArithmeticAverageCalculator';
import { RegressionCalculator } from './RegressionCalculator';

// smoke tests verifying automatic calculation and chart toggle

describe('calculator auto‑compute and chart toggle', () => {
  test('arithmetic average updates result as input changes and chart button works', () => {
    render(<ArithmeticAverageCalculator />);

    // initially no result
    expect(screen.queryByText(/Arithmetic average/i)).toBeNull();

    // type some returns
    fireEvent.change(screen.getByLabelText(/Periodic returns/i), { target: { value: '0.1 0.1 0.1' } });

    // result appears automatically
    // result paragraph includes label with colon
    expect(screen.getByText(/Arithmetic average:/i)).toBeTruthy();
    expect(screen.getByText(/10\.00%/)).toBeTruthy();

    // show chart toggle
    const toggle = screen.getByRole('button', { name: /show chart/i });
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /chart\.js/i })).toBeTruthy();

    // hide chart again
    fireEvent.click(toggle);
    expect(screen.queryByRole('button', { name: /chart\.js/i })).toBeNull();
  });

  test('regression calculator updates result and shows scatter after toggle', () => {
    render(<RegressionCalculator />);

    const xInput = screen.getByLabelText(/Independent X/i);
    const yInput = screen.getByLabelText(/Dependent Y/i);
    fireEvent.change(xInput, { target: { value: '1 2 3' } });
    fireEvent.change(yInput, { target: { value: '2 4 6' } });

    expect(screen.getByText(/slope/i)).toBeTruthy();

    const toggle = screen.getByRole('button', { name: /show chart/i });
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /chart\.js/i })).toBeTruthy();
  });
});
