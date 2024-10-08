import { createRoot } from 'react-dom/client';
import { App } from './app';
import { AppContextProvider } from 'common/context';
import { QueryProvider } from 'common/components/providers/QueryProvider';
import 'assets/styles/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <AppContextProvider>
        <QueryProvider>
            <App />
        </QueryProvider>
    </AppContextProvider>,
);
