import { useContext } from 'react';
import { AuthContext, AuthProvider, TAuthConfig } from 'react-oauth2-code-pkce';

import App from './App';

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  redirectUri:
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname,
  scope: 'user-read-currently-playing',
  decodeToken: false,
  /*onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) =>
    window.confirm(
      'Session expired. Refresh page to continue using the site?'
    ) && event.login(),*/
};

const SecuredApp = () => {
  const { token } = useContext(AuthContext);

  return token ? <App /> : null;
};

const WrappedSecuredApp = () => (
  <AuthProvider authConfig={authConfig}>
    <SecuredApp />
  </AuthProvider>
);

export default WrappedSecuredApp;
