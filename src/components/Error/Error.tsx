const Error = () => {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <div className="text-center ">
        <div className="text-2xl font-bold"> Something went wrong</div>
        <div className="text-neutral-500 font-light mt-2"> try again Later</div>
      </div>

      <div className="w-48 mt-4">
        <button className="rounded-lg hover:opacity-80 transition w-full bg-white border-orange-500 text-black border-2 py-3">
          error
        </button>
      </div>
    </div>
  );
};

export default Error;
