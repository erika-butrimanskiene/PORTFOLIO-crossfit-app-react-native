import {firebase} from '@react-native-firebase/database';

export const database = firebase
  .app()
  .database(
    'https://first-rn-project-ce575-default-rtdb.europe-west1.firebasedatabase.app/',
  );
