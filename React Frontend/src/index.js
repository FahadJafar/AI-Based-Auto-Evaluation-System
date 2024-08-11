import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

// Replace with your actual Auth0 domain and client ID
const domain = 'dev-b8peuhb47xlrzwbd.us.auth0.com';
const clientId = 'ZsZ25EHcIpPldCBhKrh8Jx4YaCK9HXrM';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

      <App />
    
  </Auth0Provider>
);
