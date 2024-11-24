import React from 'react';

interface FillShapeProps {
  size: number; // The size of the shape (width and height)
  color: string; // The fill color of the shape
  percentage: number; // The percentage of the shape to fill (0 to 100)
  shape?: 'circle' | 'roundedSquare'; // The shape type
}

const FillShape: React.FC<FillShapeProps> = ({ size, color, percentage, shape = 'circle' }) => {
  // Ensure the percentage is within bounds
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Calculate the fill height in pixels
  const fillHeight = (clampedPercentage / 100) * size;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: shape === 'circle' ? '50%' : '15%',
        // backgroundColor: 'transparent', // Light gray background for the shape
        overflow: 'hidden', // Ensure the fill doesn't exceed the shape
        outline: `1px solid ${color}`, // Black border around the shape
      }}
      className='bg-background'
    >
      {/* Fill area */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: fillHeight,
          backgroundColor: color,
          transition: 'height 0.3s ease-in-out', // Smooth transition for dynamic updates
        }}
      />
    </div>
  );
};

export default FillShape;
