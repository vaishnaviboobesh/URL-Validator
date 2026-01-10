/**
 * Throttles the execution of the given function using the given delay
 * @param {T} func - The function to be throttled with execution
 * @param {number} delay - Delay in ms
 * @returns {(...args: Parameters<T>) => void} The input function
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastExecutionTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remainingTime = delay - (now - lastExecutionTime);

    lastArgs = args;

    if (remainingTime <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      lastExecutionTime = now;
      func(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastExecutionTime = Date.now();
        timeoutId = null;

        if (lastArgs) {
          func(...lastArgs);
        }
      }, remainingTime);
    }
  };
}
