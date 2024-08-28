
const HomePage = () => {
  return (
    <div className="flex flex-col h-full w-full">
			<div className="px-4 space-y-2">
        <p className="p-10 sticky top-0 bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          Bond Comparison
        </p>
        <p className="text-center text-lg text-gray-500">
          Compare the costs of different home loans
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4">
            <p className="text-center text-xl font-bold">Coming Soon</p>
            <p className="text-center text-gray-500">
              This page is still under construction
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage