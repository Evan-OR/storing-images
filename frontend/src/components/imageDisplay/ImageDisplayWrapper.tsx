import { ImageOrientation, SmallImage } from '../../types';
import styles from './imageDisplayStyle.module.scss';
import ImageDisplay from './ImageDisplay';

type ImageDisplayWrapperProps = {
  imagesInfo: SmallImage[];
  orientation: ImageOrientation;
  toggleModal: (url: string) => void;
};

function ImageDisplayWrapper(props: ImageDisplayWrapperProps) {
  const { imagesInfo, orientation, toggleModal } = props;
  return (
    <div className={styles.imageDisplayWrapper}>
      {imagesInfo
        .filter((img) => img.orientation === orientation)
        .map((img) => (
          <ImageDisplay key={img.imageId} imgInfo={img} toggleModal={toggleModal} />
        ))}
    </div>
  );
}

export default ImageDisplayWrapper;
