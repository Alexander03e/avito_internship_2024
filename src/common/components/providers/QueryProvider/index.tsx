import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, ReactElement } from 'react';

export const QueryProvider = ({ children }: PropsWithChildren): ReactElement => {
    const client = new QueryClient();

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
