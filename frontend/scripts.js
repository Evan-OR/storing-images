const preview = () => {
  const imgElement = document.getElementById('imgDisplay');
  const file = document.getElementById('img').files[0];

  imgElement.src = URL.createObjectURL(file);
  console.log(file);
};

const postImage = async (e) => {
  e.preventDefault();

  const file = document.getElementById('img').files[0];
  let fd = new FormData();
  fd.append('image', file, 'img.jpeg');

  const req = await fetch(`http://localhost:8080/upload`, {
    method: 'post',
    body: fd,
  });

  const res = await req.json();
  console.log(res);
};

// const getImages = async () => {
//   const req = await fetch(`http://localhost:8080/images`);
//   const res = await req.json();
//   console.log(res[0].image);

//   const buff = Buffer.from(res[0].image.data);
//   const blob = new Blob([buff]);
// };
