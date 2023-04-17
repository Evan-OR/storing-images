const sharp = require('sharp');

const imageUploading = (req, res, conn) => {
  const sql = 'insert into image_store (image_base64, image_small_base64) values (?,?);';

  const img = req.file.buffer.toString('base64');
  console.log(req.file.buffer);
  const { width, height } = req.body;

  const w = Math.round(width / 4);
  const h = Math.round(height / 4);

  sharp(req.file.buffer)
    .resize(w, h)
    .jpeg({ mozjpeg: true })
    .toBuffer()
    .then((data) => {
      const downScaledImage = data.toString('base64');

      conn.execute(sql, [img, downScaledImage], (err) => {
        if (err) {
          res.status(500).send({ message: 'SEVER ERROR' });
          throw err;
        }
        res.status(200).send({ message: 'image Uploaded' });
      });
    });
};

module.exports = { imageUploading };
