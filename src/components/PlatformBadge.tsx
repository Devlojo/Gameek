type TPlatformBadge = {
  platform: string;
  index: number;
};

export const PlatformBadge = ({ platform, index }: TPlatformBadge) => {
  return (
    <p
      key={index}
      className="rounded-sm p-1 text-xs text-black shadow-sm shadow-gray-800"
    >
      {platform}
    </p>
  );
};
