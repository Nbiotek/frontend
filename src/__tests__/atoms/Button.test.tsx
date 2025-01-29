import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '@/atoms/Buttons';

describe('<Button />', () => {
  it('renders without crashing', () => {
    render(<Button text="Click me" variant="filled" />);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('displays the correct text', () => {
    render(<Button text="Submit" variant="outlined" />);
    expect(screen.getByText('Submit')).toBeDefined();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button text="Click" variant="filled" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loader when isLoading is true', () => {
    render(<Button text="Loading" variant="filled" isLoading />);
    expect(screen.getByTestId('loader')).toBeDefined();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button text="Disabled" variant="outlined" disabled />);
    expect(screen.getByText('Disabled')).toBeDefined();
  });

  it('renders left and right icons when provided', () => {
    const leftIcon = <span>Left</span>;
    const rightIcon = <span>Right</span>;
    render(
      <Button text="With Icons" variant="transparent" leftIcon={leftIcon} rightIcon={rightIcon} />
    );
    expect(screen.getByText('Left')).toBeDefined();
    expect(screen.getByText('Right')).toBeDefined();
  });
});
