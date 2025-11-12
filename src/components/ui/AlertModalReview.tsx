import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { CiSquareInfo } from "react-icons/ci";
import clsx from "clsx";
import { GiConfirmed } from "react-icons/gi";

type TAlertProps = {
  type?: string;
  title: string;
  description: string;
  buttonLabel?: string;
  setAlertModalCreatedReview?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AlertModalReview = ({
  type,
  title,
  description,
  buttonLabel,
  setAlertModalCreatedReview,
}: TAlertProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button className="hidden" onClick={() => setIsOpen(true)}></button>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          if (setAlertModalCreatedReview) setAlertModalCreatedReview(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/70 px-4 backdrop-blur-[2px]">
          <DialogPanel className="flex max-w-lg flex-col items-center bg-customWhite px-12 py-6 shadow-md shadow-black">
            <DialogTitle
              className={clsx(
                "my-2 flex items-center gap-1 text-lg font-bold text-blue-600",
                type === "success" && "text-green-600",
              )}
            >
              {type === "success" ? (
                <GiConfirmed className="size-8" />
              ) : (
                <CiSquareInfo className="size-8" />
              )}

              {title}
            </DialogTitle>
            <Description>{description}</Description>
            <div className="mt-4">
              {buttonLabel && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (setAlertModalCreatedReview)
                      setAlertModalCreatedReview(false);
                  }}
                  className="bg-mainYellow p-2 shadow-sm shadow-black"
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
