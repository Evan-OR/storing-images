const preview = () => {
  const imgElement = document.getElementById('imgDisplay');
  const file = document.getElementById('img').files[0];

  imgElement.src = URL.createObjectURL(file);

  setTimeout(() => {
    const imageWidth = document.getElementById('imgDisplay').naturalWidth;
    const imageHeigh = document.getElementById('imgDisplay').naturalHeight;
    const orientation = imageHeigh > imageWidth ? 'portrait' : 'landscape';
    console.log(`${imageWidth}x${imageHeigh}`, orientation);
  }, 200);
};

const postImage = async (e) => {
  e.preventDefault();

  const file = document.getElementById('img').files[0];

  const imageWidth = document.getElementById('imgDisplay').naturalWidth;
  const imageHeigh = document.getElementById('imgDisplay').naturalHeight;
  const orientation = imageHeigh > imageWidth ? 'portrait' : 'landscape';

  let fd = new FormData();

  fd.append('image', file, 'img.jpeg');
  fd.append('width', imageWidth);
  fd.append('height', imageHeigh);
  fd.append('orientation', orientation);

  const req = await fetch(`http://localhost:8080/image/upload`, {
    method: 'post',
    body: fd,
  });

  const res = await req.json();
  console.log(res);
};

const getImages = async (getSmall) => {
  const req = await fetch(`http://localhost:8080/images`);
  const res = await req.json();
  console.log(res);

  let html = '';
  res.forEach((imageInfo) => {
    const link = getSmall ? imageInfo.smallImageLink : imageInfo.imageLink;
    html += `<img draggable="false" class="img" src='${link}' />`;
  });

  document.getElementById('imagesDisplay').innerHTML = html;
};
