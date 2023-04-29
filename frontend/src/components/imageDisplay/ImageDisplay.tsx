import { SmallImage } from '../../types';
import styles from './imageDisplayStyle.module.scss';

type ImageDisplayProps = {
  imgInfo: SmallImage;
  toggleModal: (url: string) => void;
};

function ImageDisplay(props: ImageDisplayProps) {
  const { imgInfo, toggleModal } = props;
  const { orientation, smallImageLink, imageLink } = imgInfo;

  return (
    <div onClick={() => toggleModal(imageLink)} className={styles.imageDisplay}>
      <img
        draggable="false"
        className={orientation === 'landscape' ? styles.landscape : styles.portrait}
        src={smallImageLink}
      />
      <div className={styles.title}>TITLE</div>
      <div className={styles.desc}>desc</div>
    </div>
  );
}

export default ImageDisplay;
