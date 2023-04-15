const preview = () => {
  const imgElement = document.getElementById('imgDisplay');
  const file = document.getElementById('img').files[0];

  imgElement.src = URL.createObjectURL(file);
  console.log(file);
};

const postImage = async (e) => {
  e.preventDefault();
  const file = document.getElementById('img').files[0];

  const req = await fetch(`http://localhost:8080/upload`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: URL.createObjectURL(file),
  });

  const res = await req.json();
  console.log(res);
};

const getImages = async () => {
  const req = await fetch(`http://localhost:8080/images`);
  const res = await req.json();
  console.log(res[0].image);

  const buff = Buffer.from(res[0].image.data);
  const blob = new Blob([buff]);
};
