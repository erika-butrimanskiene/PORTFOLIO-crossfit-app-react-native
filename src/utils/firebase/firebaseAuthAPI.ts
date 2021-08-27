import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Reactotron from 'reactotron-react-native';

export interface IFirebaseAuth {
  status: Boolean;
  email?: string;
  name?: string;
  surname?: string;
  uid?: string;
  code?: string;
  imageUrl?: string;
}

export const login = async (
  email: string,
  password: string,
): Promise<IFirebaseAuth> => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return {
      status: true,
      email: response.user.email,
      uid: response.user.uid,
    };
  } catch (e) {
    return {status: false, code: e.code};
  }
};

export const fbLogin = async (): Promise<IFirebaseAuth> => {
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
    const response = await auth().signInWithCredential(facebookCredential);

    return {
      status: true,
      email: response.user.email,
      name: response.additionalUserInfo.profile.first_name,
      surname: response.additionalUserInfo.profile.last_name,
      uid: response.user.uid,
      imageUrl: response.additionalUserInfo.profile.picture.data.url,
    };
  } catch (e) {
    return {status: false, code: e};
  }
};

export const register = async (
  email: string,
  password: string,
): Promise<IFirebaseAuth> => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    return {
      status: true,
      email: response.user.email,
      uid: response.user.uid,
    };
  } catch (e) {
    return {status: false, code: e.code};
  }
};

export const resetPasswordEmail = async (
  email: string,
): Promise<IFirebaseAuth> => {
  try {
    await auth().sendPasswordResetEmail(email);
    return {status: true};
  } catch (e) {
    return {status: false, code: e.code};
  }
};

export const logout = async (): Promise<IFirebaseAuth> => {
  try {
    await auth().signOut();
    return {
      status: true,
    };
  } catch (e) {
    return {status: false, code: e.code};
  }
};
