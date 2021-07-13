import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            const response = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            console.log(response);
            return {
              status: true,
              email: response.user.email,
              uid: response.user.uid,
            };
          } catch (e) {
            console.log(e.code);
            return {status: false, code: e.code};
          }
        },
        fbLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            const response = await auth().signInWithCredential(
              facebookCredential,
            );
            console.log(response);
            return {
              status: true,
              email: response.user.email,
              uid: response.user.uid,
            };
          } catch (e) {
            console.log(e);
            return {status: false, code: e};
          }
        },
        register: async (email, password) => {
          try {
            const response = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            console.log(response);
            return {
              status: true,
              email: response.user.email,
              uid: response.user.uid,
            };
          } catch (e) {
            console.log(e.code);
            return {status: false, code: e.code};
          }
        },
        logout: async () => {
          try {
            auth().signOut();
            return {
              status: true,
            }
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
