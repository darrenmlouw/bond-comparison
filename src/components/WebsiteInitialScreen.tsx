import HouseLogo from '/HouseIcon128.webp';

export const WebsiteInitialScreen = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full cursor-none"
      aria-live="polite"
      aria-label="Loading, please wait..."
    >
      <div className="flex items-center justify-center w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-full animate-ping">
        <img
          src={HouseLogo}
          alt="Logo"
          width="128"
          height="128"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
