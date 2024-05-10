import NavBar from "./NavBar";

function Container({ children }: any, { className }: any) {
  return (
    <>
      <NavBar />
      <div
        className={`${className} flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background min-h-screen`}
      >
        {children}
      </div>
    </>
  );
}

export default Container;
