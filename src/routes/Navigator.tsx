import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {RootState} from 'src/state/reducers';

//ROUTES
import ROUTES from './Routes';
import {actions} from '../state/actions';
import {database} from '../utils/database';
import {RootStackParamList} from './Interface';
//SCREENS
import LandingView from '../containers/LandingScreenFlow/LandingView';
import LoginView from '../containers/AuthFlow/LoginView';
import RegisterView from '../containers/AuthFlow/RegisterView';
import ForgotPasswordView from '../containers/AuthFlow/ForgotPasswordView';
import HomeView from '../containers/HomeScreenFlow/HomeView';
import ProfileView from '../containers/UserFlow/ProfileView';
import CreateWorkoutView from '../containers/AdminFlow/CreateWorkoutView';
import WorkoutsListView from '../containers/AdminFlow/WorkoutsListView';
import CreateWodView from '../containers/AdminFlow/CreateWodView';
import WodsListView from '../containers/WodsFlow/WodsListView';
import WodDetailView from '../containers/WodsFlow/WodDetailView';
import ActivityBoard from '../containers/UserFlow/ActivityBoard';
import ActivitiesHistory from '../containers/UserFlow/ActivitiesHistory';
//COMPONENTS
import NotificationModal from '../components/NotificationModal';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  //STATES
  const [initializing, setInitializing] = useState(true);

  const error = useSelector((state: RootState) => state.messages.authErrorMsg);
  const successMsg = useSelector(
    (state: RootState) => state.messages.successMsg,
  );
  const user = useSelector((state: RootState) => state.user.user);
  //VARIABLES
  const errorText = t(`authErrors:${error}`);
  const successMsgText = t(`succesNotifications:${successMsg}`);

  return (
    <NavigationContainer>
      {errorText !== '' && (
        <NotificationModal
          notificationIcon={'error-outline'}
          bgColor={'#B22430'}
          errorText={errorText}
          onPress={() => dispatch(actions.messages.clearMessages())}
        />
      )}
      {successMsgText !== '' && (
        <NotificationModal
          notificationIcon={'check-circle-outline'}
          bgColor={'#0b965a'}
          errorText={successMsgText}
          onPress={() => dispatch(actions.messages.clearMessages())}
        />
      )}
      {Object.keys(user).length !== 0 ? (
        <Stack.Navigator
          screenOptions={{
            title: '',
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
            },
            headerTintColor: 'white',
          }}>
          <Stack.Screen name={ROUTES.Home} component={HomeView} />
          <Stack.Screen name={ROUTES.Profile} component={ProfileView} />
          <Stack.Screen
            name={ROUTES.CreateWorkout}
            component={CreateWorkoutView}
          />
          <Stack.Screen
            name={ROUTES.WorkoutsList}
            component={WorkoutsListView}
          />
          <Stack.Screen name={ROUTES.CreateWod} component={CreateWodView} />
          <Stack.Screen name={ROUTES.WodsList} component={WodsListView} />
          <Stack.Screen name={ROUTES.WodDetail} component={WodDetailView} />
          <Stack.Screen name={ROUTES.ActivityBoard} component={ActivityBoard} />
          <Stack.Screen
            name={ROUTES.ActivitiesHistory}
            component={ActivitiesHistory}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            title: '',
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
            },
            headerTintColor: 'white',
          }}>
          <Stack.Screen name={ROUTES.Landing} component={LandingView} />
          <Stack.Screen name={ROUTES.Login} component={LoginView} />
          <Stack.Screen name={ROUTES.Register} component={RegisterView} />
          <Stack.Screen name={ROUTES.Password} component={ForgotPasswordView} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
