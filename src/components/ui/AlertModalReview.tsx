import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export const AlertModalReview = () => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button onClick={() => setIsOpen(true)}></button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/70 px-4 backdrop-blur-[2px]">
          <DialogPanel className="max-w-lg bg-customWhite px-12 py-6 shadow-md shadow-black">
            <DialogTitle className="my-2 font-bold">
              Sois respectueux !{" "}
            </DialogTitle>
            <Description>
              /!\ Petit rappel : ton test sera relu par un modérateur avant
              publication. Merci de rester poli et respectueux lors de ton test
              !
            </Description>
            <div className="mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-mainYellow p-2 shadow-sm shadow-black"
              >
                J'ai compris
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
