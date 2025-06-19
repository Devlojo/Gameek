type TPlatformBadge = {
  platform: string;
};

export const PlatformBadge = ({ platform }: TPlatformBadge) => {
  return (
    <>
      <p className="rounded-sm p-1 text-xs text-customWhite shadow-sm shadow-mainYellow">
        {platform}
      </p>
    </>
  );
};
