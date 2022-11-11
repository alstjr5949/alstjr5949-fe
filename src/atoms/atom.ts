import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'data',
  storage: sessionStorage,
});

interface IUserData {
  data: {
    accessToken: string;
    user: {
      ID: string;
      NAME: string;
    };
  };
}

export const userDataAtom = atom<IUserData>({
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
  effects_UNSTABLE: [persistAtom],
});
