const getImage = (req, res, conn, getSmall) => {
  const { id } = req.params;
  const column = getSmall ? 'image_small_base64' : 'image_base64';

  const sql = `select ${column} from image_store where id = ?`;

  conn.execute(sql, [id], (err, results, tables) => {
    if (err) {
      res.status(500).send({ message: 'SEVER ERROR' });
      throw err;
    }
    const imageInBase64 = results[0][column];
    console.log(results[0]);
    const img = Buffer.from(imageInBase64, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': img.length,
    });
    res.end(img);
  });
};

module.exports = getImage;
