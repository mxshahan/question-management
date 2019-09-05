import { generate } from 'shortid';
import fs from 'fs-extra';
const env = process.env.NODE_ENV;

export const fileUploadMiddlware = async (req, res, next) => {
  if (req.files) {
    // return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    // Use the mv() method to place the file somewhere on your server

    const ext = (sampleFile.name).split('.');
    const newFilename = `${Date.now()}-${generate()}.${ext[1]}`;

    const uploadPathname = '/uploads';
    const uploadDir = './public' + uploadPathname;

    if (fs.existsSync(uploadDir)) {
      console.log('yes');
    } else {
      console.log('no');
      fs.mkdirSync(uploadDir);
    }

    const uploadPath = `${uploadDir}/${newFilename}`;

    const uploadStatus = sampleFile.mv(uploadPath);

    req.filename = newFilename;
    if (env === 'production') {
      req.filePath = `${uploadPathname}/${newFilename}`;
    } else {
      req.filePath = `${uploadPathname}/${newFilename}`;
    }

    if (!uploadStatus) {
      return res.status(500).send(new Error('unable to upload image'));
    }
  }
  next();
};

export const fileDelete = async (file) => {
  if (file) {
    const filePath = `./public/uploads/${file}`;
    try {
      await fs.remove(filePath);
    } catch (e) {
      console.log(e);
    }
    return file;
  } else {
    console.log('no file found');
  }
};