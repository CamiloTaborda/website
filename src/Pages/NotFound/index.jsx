import Layout from "../../Components/Layout"

const NotFound = () => {
  return (
    <Layout>
      <div className="bg-black h-screen w-full flex justify-center items-center">
        <img className="filter invert brightness-200 w-48 h-48" src="/public/Icons/pagina-no-encontrada.png" alt="Página no encontrada" />
      </div>
    </Layout>
  );
}

export default NotFound;
