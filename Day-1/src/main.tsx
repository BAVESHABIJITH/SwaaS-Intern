import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import FormEvent from './FormEvent.tsx'
// import UnControlledForms from './UnControlledForms.tsx'
// import RegistrationPage from './RegistrationPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <FormEvent /> */}
    {/* <UnControlledForms /> */}

    {/* <RegistrationPage /> */}
  </StrictMode>
)
