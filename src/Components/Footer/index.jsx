import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-6 border-t border-gray-600">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-10 max-w-[1500px]">
        
        <div>
          <h3 className="text-lg font-semibold">{t('followUs')}</h3>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://x.com/CamiloT08701893" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">{t('twitter')}</a>
            <a href="https://www.instagram.com/camilo.tl/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">{t('instagram')}</a>
            <a href="https://www.linkedin.com/in/camilo-taborda-20724917a/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">{t('linkedin')}</a>
            <a href="https://github.com/CamiloTaborda" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">{t('github')}</a>
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold">{t('contact_footer')}</h4>
          <p className="text-sm flex flex-col mt-2">
            <a href="mailto:camilotaborda2010@gmail.com" className="hover:text-gray-400">{t('email')}</a>
            <a href="https://wa.me/+573052737622" target="blank" className="hover:text-gray-400">{t('phone')}</a>
          </p>
        </div>

        <div>
          <h4 className="text-md font-semibold">{t('featuredProjects')}</h4>
          <p className="text-sm mt-2">
            <a href="/portfolio" className="hover:text-gray-400">{t('modularConfigurator')}</a> | 
            <a href="/portfolio" className="hover:text-gray-400">{t('productAnimation')}</a> | 
            <a href="/portfolio" className="hover:text-gray-400">{t('productTour')}</a>
          </p>
        </div>

        <p className="text-sm mt-4 md:col-span-3">&copy; 2024 {t('companyName')}. {t('rightsReserved')}</p>
      </div>
    </footer>
  );
};

export default Footer;
