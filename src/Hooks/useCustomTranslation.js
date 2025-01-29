import { useTranslation } from 'react-i18next';

const useCustomTranslation = () => {
  const { t } = useTranslation();
  return t;
};

export default useCustomTranslation;
