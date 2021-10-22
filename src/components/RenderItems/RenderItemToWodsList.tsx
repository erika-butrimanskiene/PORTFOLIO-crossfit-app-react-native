import React from 'react';
import styled, {DefaultTheme, withTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';

//LIBRARIES
import {showAlert, closeAlert} from 'react-native-customisable-alert';
//ROUTES
import {RootState} from '../../state/reducers';
import {actions} from '../../state/actions';
//UTILS
import {formatDateToDate, formatDateToTime} from '../../utils/dateFormating';
//UTILS-DATABASE
import {
  getUserByUid,
  addAttendee,
  removeAattendee,
} from '../../utils/firebase/firebaseDatabaseAPI';
//INTERFACES
import {IAttendee, IWodState, IWodTime} from '../../state/wods/wodsInterface';
import {IUser} from '../../state/user/userInterface';
//COMPONENTS
import WodTimeInfo from '../WodTimeInfo';
import SmallBtn from '../Buttons/SmallBtn';
import ConfirmationModal from '../Modals/ConfirmationModal';

interface IRenderItemToWorkoutsList {
  theme: DefaultTheme;
  item: IWodTime;
  index: number;
  disabledRegisterOrCancel: boolean;
  sortedWodByDate: IWodState;
  setWodAttendees: any;
  setShowModal: any;
}

const RenderItemToWorkoutsList: React.FC<IRenderItemToWorkoutsList> = ({
  item,
  index,
  theme,
  disabledRegisterOrCancel,
  sortedWodByDate,
  setWodAttendees,
  setShowModal,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  //STATES
  const user = useSelector((state: RootState) => state.user.user);

  //VARIABLES
  let today = new Date();
  const todayDate = formatDateToDate(today);
  const todayTime = formatDateToTime(today);
  let attendees: IAttendee[] = [];
  if (item.attendees) {
    attendees = item.attendees;
  }

  //FUNCTIONS
  const handleRegister = (index: number) => {
    if (
      disabledRegisterOrCancel ||
      (sortedWodByDate.date === todayDate &&
        sortedWodByDate.data.times[index].wodTime + 1 < todayTime)
    ) {
      dispatch(actions.messages.setErrorMessage('wodTimeIsPassed'));
    } else {
      showAlert({
        alertType: 'custom',
        customAlert: (
          <ConfirmationModal
            confirmText={t('wods:register')}
            alertText={t('wods:willBeRegister')}
            onCancelPress={() => closeAlert()}
            onConfirmPress={() => {
              const url = `/WODs/${sortedWodByDate.date}/${sortedWodByDate.data.type}/times/${index}/attendees`;
              addAttendee(url, {
                uid: user.uid,
              });
              closeAlert();
            }}
          />
        ),
      });
    }
  };

  const handleUnregister = (index: number) => {
    if (
      disabledRegisterOrCancel ||
      (sortedWodByDate.date === todayDate &&
        sortedWodByDate.data.times[index].wodTime + 1 < todayTime)
    ) {
      dispatch(actions.messages.setErrorMessage('wodTimeIsPassed'));
    } else {
      showAlert({
        alertType: 'custom',
        customAlert: (
          <ConfirmationModal
            confirmText={t('wods:yesCancel')}
            alertText={t('wods:willBeUnregister')}
            onCancelPress={() => closeAlert()}
            onConfirmPress={() => {
              const url = `/WODs/${sortedWodByDate.date}/${sortedWodByDate.data.type}/times/${index}/attendees`;
              removeAattendee(url, user.uid);
              closeAlert();
            }}
          />
        ),
      });
    }
  };

  const showAttendees = async (itemAttendees: IAttendee[]) => {
    if (itemAttendees) {
      let attendees: {
        uid: string;
        name: string;
        surname: string;
        imageUrl: string;
      }[] = [];

      await Promise.all(
        itemAttendees.map(async attendee => {
          let user: IUser = await getUserByUid(attendee.uid);
          attendees.push({
            uid: user.uid,
            name: user.name,
            surname: user.surname,
            imageUrl: user.imageUrl,
          });
        }),
      );

      setWodAttendees(attendees);
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <ScheduleItem>
      <WodTimeInfo
        wodTime={item.wodTime}
        coachName={item.coachName}
        wodRoom={item.wodRoom}
      />
      <ScheduleActions>
        {Object.values(attendees).filter(item => item.uid === user.uid)
          .length === 0 ? (
          <SmallBtn
            text={t('wods:register')}
            bgColor={theme.appColors.primaryColorLighter}
            border={false}
            onPress={() => {
              handleRegister(index);
            }}
          />
        ) : (
          <SmallBtn
            text={t('wods:cancel')}
            bgColor={theme.appColors.backgroundColor}
            border={true}
            onPress={() => {
              handleUnregister(index);
            }}
          />
        )}

        {user.admin && (
          <SmallBtn
            text={t('admin:attendees')}
            bgColor={theme.appColors.primaryColorDarken}
            border={false}
            onPress={() => {
              showAttendees(item.attendees);
            }}
          />
        )}
      </ScheduleActions>
    </ScheduleItem>
  );
};

const ScheduleItem = styled.View`
  margin: 10px 0px;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  width: 100%;
`;

const ScheduleActions = styled.View``;

export default withTheme(RenderItemToWorkoutsList);
