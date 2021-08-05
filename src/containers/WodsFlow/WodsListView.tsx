import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import styled, {DefaultTheme, withTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {RootState} from 'src/state/reducers';
import {formatDateToDate} from '../../utils/dateFormating';
import {IWodTime} from 'src/state/wods/wodsInterface';

interface IWodsListViewProps {
  theme: DefaultTheme;
}

interface Iitem {
  item: IWodTime;
}

const WodsListView: React.FC<IWodsListViewProps> = ({theme}) => {
  const {t} = useTranslation();
  const user = useSelector((state: RootState) => state.user.user);
  const wods = useSelector((state: RootState) => state.wods.wods);
  const [showWodIndex, setShowWodIndex] = useState(null);
  const [disabledLeft, setDisabledLeft] = useState(false);
  const [disabledRight, setDisabledRight] = useState(false);

  const today = new Date();
  const todayDate = formatDateToDate(today);
  const sortedWodsByDate = wods.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  });

  const todayWod = wods.filter(wod => wod.date.includes(todayDate));
  console.log(todayWod);

  const todayWodIndex = sortedWodsByDate.indexOf(todayWod[0]);
  console.log(todayWodIndex);

  useEffect(() => {
    setShowWodIndex(todayWodIndex);
  }, []);

  const renderItem = ({item}: Iitem) => {
    return (
      <ScheduleItem>
        <Info>
          <Time>{item.wodTime}</Time>
          <CouchInfo>
            <CouchName>
              {t('wods:coach')} {item.coachName},
            </CouchName>
            <Room>
              {item.wodRoom} {t('wods:room')}
            </Room>
          </CouchInfo>
        </Info>
        <ScheduleActions>
          <RegisterBtn>
            <RegisterText>{t('wods:register')}</RegisterText>
          </RegisterBtn>
          {user.admin && (
            <AdminBtn>
              <AdminText>Admin</AdminText>
            </AdminBtn>
          )}
        </ScheduleActions>
      </ScheduleItem>
    );
  };

  return (
    <Container>
      <Heading>{t('wods:todayWod')}</Heading>
      {showWodIndex !== null && (
        <>
          <NavigateDayContainer>
            <NavigateIcon
              disabled={disabledLeft}
              onPress={() => {
                if (showWodIndex > 0) {
                  setShowWodIndex(showWodIndex - 1);
                } else {
                  setDisabledLeft(true);
                }
              }}>
              <AntDesign
                name={'left'}
                size={30}
                color={theme.appColors.accentColor}
              />
            </NavigateIcon>
            <Day>{sortedWodsByDate[showWodIndex].date}</Day>
            <NavigateIcon
              disabled={disabledRight}
              onPress={() => {
                if (showWodIndex < sortedWodsByDate.length - 1) {
                  setShowWodIndex(showWodIndex + 1);
                } else {
                  setDisabledRight(true);
                }
              }}>
              <AntDesign
                name={'right'}
                size={30}
                color={theme.appColors.accentColor}
              />
            </NavigateIcon>
          </NavigateDayContainer>
          <ImageContainer>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              }}
              resizeMode="cover">
              <ImageOverlay>
                <WodInfo>
                  <WodName>
                    {sortedWodsByDate[showWodIndex].data.workout.data.name}
                  </WodName>
                  <WodType>
                    {
                      sortedWodsByDate[showWodIndex].data.workout.data
                        .workoutType
                    }
                  </WodType>
                </WodInfo>
                <Actions>
                  <DetailsBtn onPress={() => {}}>
                    <DetailsText>Details</DetailsText>
                  </DetailsBtn>
                </Actions>
              </ImageOverlay>
            </Image>
          </ImageContainer>
          <ScheduleList>
            <FlatList
              data={sortedWodsByDate[showWodIndex].data.times}
              keyExtractor={item => item.wodTime}
              renderItem={renderItem}
            />
          </ScheduleList>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 50px;
  font-size: 20px;
  align-items: center;
`;

const Heading = styled.Text`
  margin: 0px 0px 15px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 22px;
  text-align: center;
`;

const NavigateDayContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NavigateIcon = styled.TouchableOpacity`
  padding: 0px 10px;
`;

const Day = styled.Text`
  padding: 10px 15px;
  font-size: 22px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ImageContainer = styled.View`
  margin: 30px 0px;
  width: 90%;
`;

const Image = styled.ImageBackground`
  height: 170px;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const ImageOverlay = styled.View`
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: ${({theme}) => theme.appColors.backgroundColor_opacity20};
`;

const WodInfo = styled.View`
  padding: 0px 0px 15px 15px;
  height: 100%;
  width: 60%;
  justify-content: flex-end;
`;

const WodName = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
  font-weight: bold;
`;

const WodType = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 15px;
`;

const Actions = styled.View`
  width: 40%;
`;

const DetailsBtn = styled.TouchableOpacity`
  border-radius: 5px;
  margin: 10px;
  background-color: ${({theme}) => theme.appColors.accentColor_opacity50};
  justify-content: center;
  align-items: center;
`;

const DetailsText = styled.Text`
  font-size: 17px;
  padding: 5px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ScheduleList = styled.View`
  width: 90%;
  margin-bottom: 360px;
`;

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

const Info = styled.View`
  flex-direction: row;
`;

const Time = styled.Text`
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 23px;
  font-weight: bold;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const CouchInfo = styled.View`
  padding: 0px 15px;
  justify-content: center;
`;

const CouchName = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const Room = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ScheduleActions = styled.View``;

const RegisterBtn = styled.TouchableOpacity`
  margin: 7px 0px;
  border-radius: 30px;
  padding: 5px 15px;
  background-color: ${({theme}) => theme.appColors.primaryColorLighter};
`;

const AdminBtn = styled.TouchableOpacity`
  margin: 7px 0px;
  border-radius: 30px;
  padding: 5px 15px;
  background-color: ${({theme}) => theme.appColors.primaryColorDarken};
`;

const RegisterText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const AdminText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default withTheme(WodsListView);