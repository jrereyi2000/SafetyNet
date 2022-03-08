import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Notification from '../Notification';

const BoostNotification = ({ open, setOpen }) => {
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, [open]);

  return (
    <Notification
      open={open}
      setOpen={setOpen}
      Icon={() => <Image source={require('../../../res/images/boostInverse.png')} />}
    >
      Boosted! Your request has been resent to the group.
    </Notification>
  );
};

export default BoostNotification;
