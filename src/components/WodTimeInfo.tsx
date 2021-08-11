import React from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';

interface IWodTimeInfoProps {
  wodTime: string;
  coachName: string;
  wodRoom: string;
}

const WodTimeInfo: React.FC<IWodTimeInfoProps> = ({
  wodTime,
  coachName,
  wodRoom,
}) => {
  const {t} = useTranslation();
  return (
    <Info>
      <Time>{wodTime}</Time>
      <CouchInfo>
        <CouchName>
          {t('wods:coach')} {coachName},
        </CouchName>
        <Room>
          {wodRoom} {t('wods:room')}
        </Room>
      </CouchInfo>
    </Info>
  );
};

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

export default WodTimeInfo;
