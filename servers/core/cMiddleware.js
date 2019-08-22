import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';

export default (app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(helmet());
  } else if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(cors());
  app.use(fileUpload());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
