import { useEffect, useState } from 'react';
import './App.css';
import LoadingIcon from './components/icons/LoadingIcon';
import { SmallImage, ImageOrientation } from './types';
import ImageDisplayWrapper from './components/imageDisplay/ImageDisplayWrapper';
import ImageDisplayModal from './components/imageDisplay/ImageDisplayModal';

function App() {
  const [smallImages, setSmallImages] = useState<SmallImage[]>([]);
  const [orientationFilter, setOrientationFilter] = useState<ImageOrientation>('portrait');
  const [displayImageModal, setDisplayImageModal] = useState<boolean>(false);

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'landscape' || e.target.value === 'portrait') {
      setOrientationFilter(e.target.value);
    }
  };

  const fetchSmallImages = async () => {
    const req = await fetch(`http://localhost:8080/images`);
    const res = await req.json();
    setSmallImages(res);
  };

  const toggleModal = (url: string) => {
    setDisplayImageModal(true);
  };

  useEffect(() => {
    fetchSmallImages();
  }, []);

  return (
    <>
      {displayImageModal && <ImageDisplayModal />}
      <select onChange={selectHandler} value={orientationFilter} name="orientationSelect">
        <option value="landscape">landscape</option>
        <option value="portrait">portrait</option>
      </select>
      {smallImages.length > 0 ? (
        <ImageDisplayWrapper imagesInfo={smallImages} orientation={orientationFilter} toggleModal={toggleModal} />
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}

export default App;
