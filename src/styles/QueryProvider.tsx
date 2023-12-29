'use client';
import { PropsWithChildren } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

interface Props extends PropsWithChildren {}

const queryClient = new QueryClient();

export default function QueryProvider({ children }: Props) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
