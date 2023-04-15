import React, { useMemo } from "react";
import Image from "next/image";
import vetrina from "./vetrina";
import ButtonPrimary from "./misc/ButtonPrimary";
import ButtonOutline from "./misc/ButtonOutline.";
import Maps from "../public/assets/HugeGlobal.svg";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="bg-gradient-to-b from-violet-300 to-violet-500 w-full py-14"
      id="pricing"
    >
    
    
       

        
    
      </div>
   
  );
};

export default Pricing;
