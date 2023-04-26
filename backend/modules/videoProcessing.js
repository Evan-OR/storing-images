const fs = require('node:fs');

const videoUpload = (req, res, conn) => {
  const SQL = 'insert into video_store (video_base64, video_width, video_height, video_orientation) values (?,?,?,?)';

  const vid = req.file.buffer.toString('base64');
  const { width, height, orientation } = req.body;

  conn.execute(SQL, [vid, width, height, orientation], (err, results, tables) => {
    if (err) {
      res.status(500).send({ message: 'server brokey!' });
      throw err;
    }

    res.status(200).send({ message: 'video uploaded :)' });
  });
};

const convertVideoToBase64 = () => {
  fs.readFile(__dirname + '/fromBehind.mp4', (err, data) => {
    if (err) throw err;
    fs.writeFile('video.txt', Buffer.from(data).toString('base64'), (err) => {
      if (err) throw err;
      console.log('DONE!');
    });
  });
};

module.exports = { videoUpload, convertVideoToBase64 };
