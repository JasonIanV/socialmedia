import '@testing-library/jest-dom';

declare global {
  interface Window {
    location: Location;
  }

  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toBeDisabled(): R;
      toHaveStyle(style: Record<string, any>): R;
    }

    interface Mock<T = any> extends Function {
      new (...args: any[]): T;
      (...args: any[]): any;
      mockImplementation(fn: (...args: any[]) => any): this;
      mockImplementationOnce(fn: (...args: any[]) => any): this;
      mockResolvedValue(value: any): this;
      mockResolvedValueOnce(value: any): this;
      mockRejectedValue(value: any): this;
      mockRejectedValueOnce(value: any): this;
      mockReturnValue(value: any): this;
      mockReturnValueOnce(value: any): this;
      mockClear(): void;
      mockReset(): void;
      mockRestore(): void;
    }

    type Mocked<T> = {
      [P in keyof T]: T[P] & Mock<T[P]>;
    };

    function mock<T extends {}, K extends keyof T = keyof T>(
      moduleName: string,
      factory?: () => T,
      options?: { virtual?: boolean }
    ): jest.Mocked<T>;

    function mocked<T>(item: T, deep?: boolean): jest.Mocked<T>;
  }
}

export {};