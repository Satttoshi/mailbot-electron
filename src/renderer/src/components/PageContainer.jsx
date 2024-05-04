const PageContainer = ({ children }) => {
  return (
    <div className="absolute z-0 inset-0 px-2 pt-8 pb-[306px] flex flex-col items-center">
      <div className="absolute left-2 right-4 h-6 bg-purple-900"></div>
      <div className="bg-purple-900 w-full rounded rounded-tl-none flex flex-col items-center scrollbar overflow-y-scroll">
        <div className="pt-6 flex flex-col gap-2 items-center">{children}</div>
      </div>
    </div>
  );
};

export default PageContainer;
