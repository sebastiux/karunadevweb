// src/components/ui/EnsoPhilosophy.tsx
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './EnsoPhilosophy.module.css';

const EnsoPhilosophy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          drawEnso();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  const drawEnso = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = 200;
    const centerY = 200;
    const radius = 140;
    
    // Set up the brush style
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Create points for complete circle
    const points: { x: number; y: number; angle: number }[] = [];
    const startAngle = Math.PI * 0.5; // Start at bottom
    const endAngle = Math.PI * 0.5 + Math.PI * 2; // Full circle back to bottom
    
    for (let angle = startAngle; angle <= endAngle; angle += 0.015) {
      // Keep the circle mostly round with subtle organic variations
      let r = radius;
      
      // Very subtle organic variations
      const organicVariation = Math.sin(angle * 4) * 1.2 + Math.sin(angle * 11) * 0.5;
      
      // Slight vertical compression for more natural look
      if (Math.cos(angle) > 0.7 || Math.cos(angle) < -0.7) {
        r = radius - 2;
      }
      
      r = radius + organicVariation;
      
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      
      points.push({ x, y, angle });
    }
    
    // Animate the drawing
    let currentIndex = 0;
    const totalPoints = points.length;
    
    const animate = () => {
      if (currentIndex < totalPoints) {
        ctx.beginPath();
        
        for (let i = 0; i <= currentIndex; i++) {
          const point = points[i];
          const progress = i / totalPoints;
          
          // Vary line width naturally
          let width = 10;
          
          // Thicker at the start (bottom)
          if (progress < 0.03) {
            width = 15 - (progress * 100);
          }
          // Overlap area at the end (closing the circle)
          else if (progress > 0.97) {
            width = 12 + ((progress - 0.97) * 100);
          }
          // Natural variation throughout
          else {
            width = 9 + Math.sin(progress * Math.PI * 6) * 2 + Math.random() * 0.5;
          }
          
          ctx.lineWidth = width;
          
          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        
        // Close the path to complete the circle
        if (currentIndex >= totalPoints - 1) {
          ctx.closePath();
        }
        
        ctx.stroke();
        
        // Add a blob where the circle closes (overlap effect)
        if (currentIndex === totalPoints - 1) {
          const firstPoint = points[0];
          ctx.beginPath();
          ctx.arc(firstPoint.x, firstPoint.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#1a1a1a';
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        
        currentIndex += 3;
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className={styles.content}
      >
        {/* Ensō Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.ensoWrapper}
        >
          <canvas
            ref={canvasRef}
            className={styles.ensoCanvas}
          />
        </motion.div>
        
        {/* Company phrase below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className={styles.phraseContainer}
        >
          <h3 className={styles.phrase}>
            <span className={styles.phraseLight}>If you can</span>
            <span className={styles.phraseBold}>think it</span>
            <span className={styles.phraseDivider}>—</span>
            <span className={styles.phraseLight}>we can</span>
            <span className={styles.phraseBold}>make it</span>
          </h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnsoPhilosophy;