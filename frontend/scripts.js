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
    method: 'post',
    body: file,
  });

  const res = await req.json();
  console.log(res);
};
