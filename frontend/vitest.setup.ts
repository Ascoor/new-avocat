
import '@testing-library/jest-dom';

// Add custom matchers to expect
declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {
      toBeInTheDocument(): T;
    }
  }
}
