import CardFooter from '@/components/card/CardFooter';
import CardHeading from '@/components/card/CardHeading';
import CardValue from '@/components/card/CardValue';
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  footer: string;
  color?: string;
  icon?: React.ReactNode;
};

function Card({
  label,
  value,
  prefix,
  suffix,
  footer,
  color,
  icon,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col space-y-1 bg-card outline outline-1 outline-card-foreground/20 shadow-2xl p-2.5 sm:p-4 rounded-lg"
    >
      <CardHeading label={label} icon={icon} />

      <CardValue value={value} prefix={prefix} suffix={suffix} color={color} />

      <CardFooter label={footer} />
    </motion.div>
  );
}

export default Card;
