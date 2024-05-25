import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mousePos from '../../../utils/useMousePos';
import {ReactComponent as Arrow} from '../../../svg/Arrow.svg';
import './arrowCursor.scss';


export const ArrowCursor: React.FC = () => {
    const [whichVariant, setWhichVariant] = useState("notPressed");

    const {x, y} = mousePos();

    const cursorVariants = {
        pressed: { scale: 5, x: x-12, y: y-12, backgroundColor: "#BABABA80" },
        notPressed: { scale: 1, x: x-12, y: y-12 },
        specialText: { scale: 5, x: x-12, y: y-12, backgroundColor: "#BABABA80" }
    };

    const arrowVariants = {
      pressed: { scale: 1, x: -5, y: 5},
      notPressed: { scale: 0 },
      specialText: { scale: 1, zIndex: 1 }
  };

    useEffect(() => {
        const handleMouseDown = () => {
            setWhichVariant("pressed");
        };

        const handleMouseUp = () => {
            setWhichVariant("notPressed");
        };

        // Attaching the event listeners to the window object
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        const specialTextElements = document.querySelectorAll('.special-text');

        specialTextElements.forEach(element => {
          element.addEventListener('mouseenter', () => {
              setWhichVariant("specialText");
          });
      
          element.addEventListener('mouseleave', () => {
              setWhichVariant("notPressed");
              element.classList.remove("hovering");
          });
        });

        // Cleanup function to remove the event listeners
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    
    return (
        <>
        <motion.div
          id="cursor"
          className="cursor pointer-off"
          animate={whichVariant}
          variants={cursorVariants}
        >
          <motion.div
            id="arrow"
            className="arrow-motion-wrapper"
            animate={whichVariant}
            variants={arrowVariants}
          >
            <Arrow className='arrow'/>
          </motion.div>
        </motion.div>
        </>
    );
}