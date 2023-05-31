import { useContext } from 'react';
import { AuthContext, AuthProvider, TAuthConfig } from 'react-oauth2-code-pkce';

import App from './App';
import Login from './components/Login.tsx';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const location = window.location;

const authConfig: TAuthConfig = {
  clientId: SPOTIFY_CLIENT_ID,
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  redirectUri: `${location.protocol}//${location.host}${location.pathname}`,
  scope: 'user-read-currently-playing',

  // Spotify token not a JWT.
  decodeToken: false,

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
