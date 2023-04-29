let CURRENT_VIDEO_WIDTH = 0;
let CURRENT_VIDEO_HEIGHT = 0;

const postVideo = async (e) => {
  e.preventDefault();

  const file = document.getElementById('vid').files[0];

  let fd = new FormData();
  fd.append('video', file, 'vid.mp4');
  fd.append('width', CURRENT_VIDEO_WIDTH);
  fd.append('height', CURRENT_VIDEO_HEIGHT);
  fd.append('orientation', CURRENT_VIDEO_WIDTH > CURRENT_VIDEO_HEIGHT ? 'landscape' : 'portrait');

  const req = await fetch(`http://localhost:8080/video/upload`, {
    method: 'post',
    body: fd,
  });

  const res = await req.json();
  console.log(res);
};

const previewVideo = () => {
  const file = document.getElementById('vid').files[0];
  console.log(file);
  // videoPreviw
  const video = document.getElementById('videoPreviw');
  const source = document.getElementById('videoSrc');
  console.log(video);
  source.src = URL.createObjectURL(file);
  video.load();

  video.addEventListener('loadedmetadata', (e) => {
    video.height = e.target.videoHeight / 4;
    video.width = e.target.videoWidth / 4;
    CURRENT_VIDEO_WIDTH = e.target.videoWidth;
    CURRENT_VIDEO_HEIGHT = e.target.videoHeight;
  });
};
