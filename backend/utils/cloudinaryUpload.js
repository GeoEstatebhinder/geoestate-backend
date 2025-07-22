const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

// Cloudinary Config
cloudinary.config({
  cloud_name: 'djyor8cc2',
  api_key: '811131156713543',
  api_secret: '**********',
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

module.exports = uploadToCloudinary;
