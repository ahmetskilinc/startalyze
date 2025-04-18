'use client';
import { motion } from 'motion/react';

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function MotionWrapper({
  children,
  delay = 0.2,
  duration = 0.6,
  className = '',
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
