import { Link } from "react-router-dom";
import useCustomTranslation from "../../Hooks/useCustomTranslation";
import useSeo from "../../Hooks/useSeo";
import Layout from "../../Components/Layout";

const NotFound = () => {
  const t = useCustomTranslation();

  useSeo({
    title: t('seo_notfound_title'),
    description: t('seo_notfound_description'),
    path: '/404',
  });

  return (
    <Layout background={{ backgroundColor: "black" }}>
      <div className="bg-black min-h-screen w-full flex flex-col justify-center items-center text-center px-6 gap-6">
        <img
          className="filter invert brightness-200 w-40 h-40 md:w-48 md:h-48"
          src="/Icons/pagina-no-encontrada.webp"
          alt=""
        />
        <h1 className="font-extrabold text-white text-3xl md:text-5xl">
          {t('not_found_title')}
        </h1>
        <p className="font-medium text-gray-300 text-base md:text-lg max-w-md">
          {t('not_found_text')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300"
        >
          {t('not_found_button')}
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
