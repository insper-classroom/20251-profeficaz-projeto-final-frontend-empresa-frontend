import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import Overview from './components/Overview/Overview.jsx'
import Noticias from './components/Noticias/Noticias.jsx'
import NoticiasDetalhes from './components/Noticias/NoticiasDetalhes.jsx'
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "overview/:SIAFI",
        element: <Overview />
      },
      {
        path: "noticias",
        element: <Noticias />
      },
      {
        path: "noticias/:titulo",
        element: <NoticiasDetalhes />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
