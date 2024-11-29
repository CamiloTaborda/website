const Spinner = () => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black z-50">
        <div className="flex flex-row gap-2">
         <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
         <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
         <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
    </div>
    );
  };
  
  export default Spinner;