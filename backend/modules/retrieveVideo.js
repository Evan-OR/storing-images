const getVideoById = (req, res, conn) => {
  const { id } = req.params;

  const sql = `select * from video_store where id = ?`;

  conn.execute(sql, [id], (err, results, tables) => {
    if (err) {
      res.status(500).send({ message: 'SEVER ERROR' });
      throw err;
    }

    if (results.length < 1) {
      res.status(404).send({ message: `No video with id ${id} found.` });
      return;
    }

    const videoInBase64 = results[0]['video_base64'];
    const video = Buffer.from(videoInBase64, 'base64');
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': video.length,
    });
    res.end(video);
  });
};

module.exports = { getVideoById };
