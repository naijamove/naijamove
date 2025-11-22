// components/Modal.tsx
"use client";

import { useModalStore } from "@/store/useModalStore";
import React, { useState } from "react";
import { Button } from "./ui/button";

const Modal = () => {


const {closeModal,content,isOpen} = useModalStore()

  return (
    <>
   {isOpen &&  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative" 
      onClick={(e)=> {
        e.stopPropagation()
      }}
      >
        {/* Close button */}
        {/* <button
          onClick={}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
          ✕
          </button> */}

        {/* Modal Title */}
        {/* {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>} */}

        {/* Modal Content */}
        <div>{content}</div>
      <div className="flex justify-center mt-4">
      <Button 
        onClick={()=> closeModal()}
        >Close</Button>
      </div>
      </div>
    </div>}
        </>
  );
};

export default Modal;
