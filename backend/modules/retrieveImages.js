const getImageById = (req, res, conn, getSmall) => {
  const { id } = req.params;
  const column = getSmall ? 'image_small_base64' : 'image_base64';

  const sql = `select ${column} from image_store where id = ?`;

  conn.execute(sql, [id], (err, results, tables) => {
    if (err) {
      res.status(500).send({ message: 'SEVER ERROR' });
      throw err;
    }
    const imageInBase64 = results[0][column];
    const img = Buffer.from(imageInBase64, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': img.length,
    });
    res.end(img);
  });
};

const getImageInfo = (req, res, conn) => {
  conn.query('SELECT id FROM images.image_store;', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'SEVER ERROR' });
      throw err;
    }

    res.status(200).send(
      results.map((row) => {
        return {
          imageId: row.id,
          imageLink: `http://localhost:8080/image/${row.id}`,
          smallImageLink: `http://localhost:8080/image/small/${row.id}`,
        };
      })
    );
  });
};

module.exports = { getImageById, getImageInfo };
