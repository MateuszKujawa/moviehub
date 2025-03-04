import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TypewriterTitleProps {
  text: string;
}

export default function TypewriterTitle({ text }: TypewriterTitleProps) {
  const speed = 100;
  const pauseBeforeRestart = 10000;
  const iconRotationTime = 500;

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [rotateIcon, setRotateIcon] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [showText, setShowText] = useState(false);
  const [finalRotation, setFinalRotation] = useState(false);

  useEffect(() => {
    if (rotateIcon) {
      setTimeout(() => {
        setRotateIcon(false);
        setAnimationRunning(true);
      }, iconRotationTime);
    }
  }, [rotateIcon]);

  useEffect(() => {
    if (!rotateIcon && animationRunning && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (index === text.length && animationRunning) {
      setAnimationRunning(false);
      setTimeout(() => {
        setFinalRotation(true);
        setTimeout(() => {
          setFinalRotation(false);
          setShowText(true);
          setTimeout(() => {
            setShowText(false);
            setDisplayedText("");
            setIndex(0);
            setRotateIcon(true);
          }, pauseBeforeRestart);
        }, iconRotationTime);
      }, 200);
    }
  }, [index, rotateIcon, animationRunning, text]);

  return (
    <motion.h1
      className="text-2xl font-bold flex items-center gap-2 text-white hover:text-indigo-200 duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={rotateIcon || finalRotation ? { rotate: 360 } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image src="/images/clapperboard.png" alt="Clapperboard" width={40} height={40} className="mb-2"/>
      </motion.div>
      {displayedText}
    </motion.h1>
  );
}