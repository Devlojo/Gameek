type TPlatformBadge = {
  platform: string;
};

export const PlatformBadge = ({ platform }: TPlatformBadge) => {
  return (
    <>
      <p className="rounded-sm p-1 text-xs text-black shadow-sm shadow-gray-800">
        {platform}
      </p>
    </>
  );
};
