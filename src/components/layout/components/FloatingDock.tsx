// src/components/ui/FloatingDock.tsx

import { cn } from '@/lib/utils';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

interface DockItem {
  title: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  href: string;
  external?: boolean;
  isImageIcon?: boolean;
  selected?: boolean; // Added selected property
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      className={cn(
        'mx-auto flex h-16 gap-6 items-end rounded-2xl px-8 pb-3 md:hidden',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden md:flex h-16 gap-6 items-end rounded-2xl px-8 pb-3',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  imageSrc,
  href,
  external = false,
  isImageIcon = false,
  selected = false, // Added selected prop
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  href: string;
  external?: boolean;
  isImageIcon?: boolean;
  selected?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 55, 40]);
  const heightTransform = useTransform(distance, [-100, 0, 150], [40, 55, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 300,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 300,
    damping: 12,
  });


  const linkContent = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className={cn(
        'aspect-square rounded-full flex items-center justify-center relative overflow-hidden',
        isImageIcon
          ? 'bg-transparent'
          : selected
          ? 'backdrop-blur-md bg-primary active:bg-primary/60 scale-110' // Highlight selected items
          : 'backdrop-blur-md bg-primary/30 active:bg-primary/60'
      )}
    >

      {isImageIcon && imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          style={{ width: '100%', height: '100%' }}
          className="rounded-full object-cover"
        />
      ) : (
        <div
          // style={{ width: '60%', height: '60%' }} // Adjusted to fit the icon nicely
          className="flex items-center justify-center"
        >
          {icon}
        </div>
      )}
    </motion.div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
      >
        {linkContent}
      </a>
    );
  } else {
    return (
      <Link to={href} aria-label={title}>
        {linkContent}
      </Link>
    );
  }
}
