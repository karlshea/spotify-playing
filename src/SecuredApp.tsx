import { useContext } from 'react';
import { AuthContext, AuthProvider, TAuthConfig } from 'react-oauth2-code-pkce';

import App from './App';
import Login from './components/Login.tsx';

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  redirectUri:
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname,
  scope: 'user-read-currently-playing',

  // Spotify token not a JWT.
  decodeToken: false,

  // Seem to need to set this otherwise it tries to log in even with a refresh
  // token on app launch.
  autoLogin: false,

  // Spotify refresh tokens don't expire.
  refreshTokenExpiresIn: 8.64e13,
};

const SecuredApp = () => {
  const { token, loginInProgress } = useContext(AuthContext);

  return token && !loginInProgress ? <App /> : <Login />;
};

const WrappedSecuredApp = () => (
  <AuthProvider authConfig={authConfig}>
    <SecuredApp />
  </AuthProvider>
);

export default WrappedSecuredApp;
