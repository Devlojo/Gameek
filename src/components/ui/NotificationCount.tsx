interface NotificationCountProps {
  bottom?: number; // valeur en Tailwind spacing (ex: 1, 2, 4, 5)
  left?: number;
  right?: number;
  top?: number;
  count?: number;
}

export const NotificationCount = ({
  bottom,
  left,
  right,
  top,
  count,
}: NotificationCountProps) => {
  // Gestion des classes tailwind dynamique
  const positionClasses = `${top !== undefined ? `top-${top}` : ""} ${
    bottom !== undefined ? `bottom-${bottom}` : ""
  } ${left !== undefined ? `left-${left}` : ""} ${
    right !== undefined ? `right-${right}` : ""
  }`;

  if (count && count > 0)
    return (
      <div
        className={`absolute ${positionClasses} rounded-full bg-red-600 px-1.5 py-0.5`}
      >
        <p className="text-xs text-customWhite">{count}</p>
      </div>
    );
};
