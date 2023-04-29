export type svgProps = {
  styles?: React.CSSProperties;
  className?: CSSModuleClasses[string];
};

export type ImageOrientation = 'landscape' | 'portrait';

export type SmallImage = {
  imageId: number;
  imageLink: string;
  orientation: 'landscape' | 'portrait';
  smallImageLink: string;
};
