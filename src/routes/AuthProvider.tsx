import React, {createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import database from '@react-native-firebase/database';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}: any) => {
  return (
    <AuthContext.Provider
      value={
        {
          // login: async (email: string, password: string):Promise<IFirebaseAuth> => {
          //   try {
          //     const response = await auth().signInWithEmailAndPassword(
          //       email,
          //       password,
          //     );
          //     console.log(response);
          //     return {
          //       status: true,
          //       email: response.user.email,
          //       uid: response.user.uid,
          //     };
          //   } catch (e) {
          //     console.log(e.code);
          //     return {status: false, code: e.code};
          //   }
          // },
          // fbLogin: async () => {
          //   try {
          //     // Attempt login with permissions
          //     const result = await LoginManager.logInWithPermissions([
          //       'public_profile',
          //       'email',
          //     ]);
          //     if (result.isCancelled) {
          //       throw 'User cancelled the login process';
          //     }
          //     // Once signed in, get the users AccesToken
          //     const data = await AccessToken.getCurrentAccessToken();
          //     if (!data) {
          //       throw 'Something went wrong obtaining access token';
          //     }
          //     // Create a Firebase credential with the AccessToken
          //     const facebookCredential = auth.FacebookAuthProvider.credential(
          //       data.accessToken,
          //     );
          //     // Sign-in the user with the credential
          //     const response = await auth().signInWithCredential(
          //       facebookCredential,
          //     );
          //     console.log(response);
          //     return {
          //       status: true,
          //       email: response.user.email,
          //       uid: response.user.uid,
          //     };
          //   } catch (e) {
          //     console.log(e);
          //     return {status: false, code: e};
          //   }
          // },
          // register: async (email: string, password: string) => {
          //   try {
          //     const response = await auth().createUserWithEmailAndPassword(
          //       email,
          //       password,
          //     );
          //     console.log(response);
          //     return {
          //       status: true,
          //       email: response.user.email,
          //       uid: response.user.uid,
          //     };
          //   } catch (e) {
          //     console.log(e.code);
          //     return {status: false, code: e.code};
          //   }
          // },
          // logout: async () => {
          //   try {
          //     auth().signOut();
          //     return {
          //       status: true,
          //     };
          //   } catch (e) {
          //     console.log(e.code);
          //     return {status: false, code: e.code};
          //   }
          // },
        }
      }>
      {children}
    </AuthContext.Provider>
  );
};