import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import Button from '../../components/Button';

const HomeView = () => {
const {logout} = useContext(AuthContext);

  return (
    <View>
      <Text>Welcome</Text>
      <Button
        text="Logout"
        bgColor="blue"
        onPress={() => logout()}
      />
    </View>
  );
};

export default HomeView;
