import React, { useEffect, useState } from 'react';
import './subpage.scss';
import { XCursor } from '../../components/Cursors/XCursor';
import { Loader } from '../../components/Cursors/Loader';

interface SubpageProps {
  setPage: (page: string) => void;
}

export const Subpage: React.FC<SubpageProps> = ({setPage}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
        setShowLoader(true);
    };

    const handleMouseUp = () => {
      setShowLoader(false);
    };

    // Attaching the event listeners to the window object
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <XCursor setPage={setPage}/>
      {showLoader && <Loader show={showLoader}/>}
      <div className="subpage-wrapper">
        <div className="left-column">
          <div className="title-wrapper">
            <h1 className="title">Andrew Bass.</h1>
            <h2 className="subtitle">that's me!</h2>
          </div>
          <div className="description-wrapper">
            <p className="description">Bingo bango bongo</p>
          </div>
        </div>
        <div className="right-column">
          <div className="image-wrapper">
          </div>
        </div>
      </div>
    </>
  );
}