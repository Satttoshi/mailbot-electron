const PageWrapper = ({ children }) => {
  return (
    <div className="absolute z-0 inset-0 px-2 pt-8 pb-[306px] flex flex-col items-center shadow">
      <div className="absolute left-2 right-4 h-6 bg-4"></div>
      <div className="bg-4 w-full h-full rounded rounded-tl-none flex flex-col items-center scrollbar overflow-y-auto">
        <div className="pt-6 flex flex-col gap-2 w-full h-full items-center">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
