const Layout = ({ children, background }) => {
  return (
    <div 
      className="flex flex-col min-h-screen items-center bg-cover bg-center bg-no-repeat" 
      style={background || { backgroundColor: "white" }}
    >
      {children}
    </div>
  );
};

export default Layout;
