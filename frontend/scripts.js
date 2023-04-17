const preview = () => {
  const imgElement = document.getElementById('imgDisplay');
  const file = document.getElementById('img').files[0];

  imgElement.src = URL.createObjectURL(file);
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

const getImages = async () => {
  const req = await fetch(`http://localhost:8080/images`);
  const res = await req.json();
  console.log(res);

  let html = '';
  res.forEach((el) => {
    html += `<img class="img" src='${el.imageLink}' />`;
  });

  document.getElementById('imagesDisplay').innerHTML = html;
};
