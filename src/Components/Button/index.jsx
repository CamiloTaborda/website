const Button = ({ href, download, children, onClick, type = "button" }) => {
  const ButtonContent = (
    <button
      type={type}
      onClick={onClick}
      className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
    >
      <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
      {children}
    </button>
  );

  return href ? (
    <a href={href} download={download} target={download ? undefined : "_blank"} rel="noopener noreferrer">
      {ButtonContent}
    </a>
  ) : (
    ButtonContent
  );
};

export default Button;
