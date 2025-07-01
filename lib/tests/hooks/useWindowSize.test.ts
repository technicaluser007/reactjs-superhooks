import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../../hooks/useWindowSize';

const resizeWindow = (width: number, height: number) => {
  (window.innerWidth as number) = width;
  (window.innerHeight as number) = height;
  window.dispatchEvent(new Event('resize'));
};

describe('useWindowSize Hook', () => {
  it('should return the window size after mount', () => {
    const { result } = renderHook(() => useWindowSize());

    // After mounting, should have actual window dimensions
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
    expect(typeof result.current.width).toBe('number');
    expect(typeof result.current.height).toBe('number');
  });

  it('should update width and height on window resize', () => {
    const { result } = renderHook(() => useWindowSize());

    // Should have initial window dimensions
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);

    act(() => {
      resizeWindow(800, 600);
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);

    act(() => {
      resizeWindow(1024, 768);
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should not update state when unmounted', () => {
    const { result, unmount } = renderHook(() => useWindowSize());

    // Should have initial window dimensions
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);

    const initialWidth = result.current.width;
    const initialHeight = result.current.height;

    unmount();

    act(() => {
      resizeWindow(500, 500);
    });

    expect(result.current.width).toBe(initialWidth);
    expect(result.current.height).toBe(initialHeight);
  });
});
