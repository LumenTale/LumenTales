// React and Next.js type declarations
declare module 'react' {
  export default React;
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type ReactNode = React.ReactNode;
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  export function useMemo<T>(factory: () => T, deps: readonly any[]): T;
}

declare module 'next/app' {
  export interface AppProps {
    Component: any;
    pageProps: any;
  }
}

declare module 'next/head' {
  export default function Head(props: any): JSX.Element;
}

declare module 'next/link' {
  export default function Link(props: any): JSX.Element;
}

declare module 'next/router' {
  export function useRouter(): {
    push: (url: string) => Promise<boolean>;
    pathname: string;
    query: Record<string, string>;
    asPath: string;
  };
}

declare module 'next/document' {
  export default class Document {
    static getInitialProps(ctx: DocumentContext): Promise<any>;
    render(): JSX.Element;
  }
  export interface DocumentContext {
    pathname: string;
    query: Record<string, string>;
    asPath: string;
    req: any;
    res: any;
    err: Error;
    renderPage: () => any;
  }
  export class Html extends React.Component<any> {}
  export class Head extends React.Component<any> {}
  export class Main extends React.Component<any> {}
  export class NextScript extends React.Component<any> {}
}

declare module 'react-hook-form' {
  export function useForm<T>(options?: any): {
    register: (name: string, options?: any) => any;
    handleSubmit: (callback: (data: T) => void) => (e: any) => void;
    formState: {
      errors: Record<string, { message?: string }>;
    };
    watch: (name: string) => any;
    setValue: (name: string, value: any) => void;
    reset: () => void;
  };
}

declare module 'react-icons/fi' {
  export const FiMail: React.FC;
  export const FiLock: React.FC;
  export const FiAlertCircle: React.FC;
  export const FiUser: React.FC;
  export const FiBook: React.FC;
  export const FiDollarSign: React.FC;
  export const FiUsers: React.FC;
  export const FiStar: React.FC;
}

// Project types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: {
    name: string;
    image?: string;
  };
  genre: string;
  readTime: number;
  rating: number;
  readersCount: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Add JSX namespace to fix JSX element errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 