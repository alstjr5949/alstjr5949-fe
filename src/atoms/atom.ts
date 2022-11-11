import { atom } from 'recoil';

export const userDataAtom = atom({
  key: 'userData',
  default: {
    data: {
      accessToken: '',
      user: {
        ID: '',
        NAME: '',
      },
    },
  },
});
