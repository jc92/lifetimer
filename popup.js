import React from 'react';
import { createRoot } from 'react-dom/client';
import LifeDashboard from './components/LifeDashboard';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<LifeDashboard />);