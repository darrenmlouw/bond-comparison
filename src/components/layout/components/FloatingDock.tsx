// src/components/ui/FloatingDock.tsx

import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

interface DockItem {
  title: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  href: string;
  external?: boolean;
  isImageIcon?: boolean;
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
        'mx-auto flex w-screen justify-around h-20  items-start rounded-t-xlmd:rounded-2xl px-8 pt-3 md:hidden',
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
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  href: string;
  external?: boolean;
  isImageIcon?: boolean;
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
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const linkContent = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'aspect-square rounded-full flex items-center justify-center relative overflow-hidden',
        isImageIcon
          ? 'bg-transparent'
          : 'backdrop-blur-md bg-primary/30 active:bg-primary/60'
      )}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="hidden md:flex px-2 py-0.5 whitespace-pre rounded-md bg-secondary absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon or Image */}
      {isImageIcon && imageSrc ? (
        <motion.img
          src={imageSrc}
          alt={title}
          style={{ width: '100%', height: '100%' }}
          className="rounded-full object-cover"
        />
      ) : (
        <motion.div
          style={{ width: '60%', height: '60%' }} // Adjusted to fit the icon nicely
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
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
