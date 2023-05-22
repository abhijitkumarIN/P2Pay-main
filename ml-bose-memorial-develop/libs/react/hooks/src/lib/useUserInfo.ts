import { IUser } from '@kleeen/auth';
import { useKleeenContext } from '.';

/** @deprecated in favor of useKleeenContext('endUser') */
const useUserInfo = (): { userInfo: IUser } => {
  const { currentUser } = useKleeenContext('endUser');
  return { userInfo: currentUser };
};

export default useUserInfo;
