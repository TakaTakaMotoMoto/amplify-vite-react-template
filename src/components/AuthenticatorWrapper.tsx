import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

const AuthenticatorWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <div>
            <h2>ようこそ, {user?.username}!</h2>
            <button onClick={signOut}>ログアウト</button>
          </div>
          {children}
        </>
      )}
    </Authenticator>
  );
};

export default AuthenticatorWrapper;
