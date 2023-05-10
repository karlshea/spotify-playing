import { useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';

const Login = () => {
  const { login } = useContext(AuthContext);

  return (
    <div>
      <button onClick={() => login()}>Login</button>
    </div>
  );
};

export default Login;
