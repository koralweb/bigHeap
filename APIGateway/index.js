import express from 'express'
import cookieParser from 'cookie-parser'
import serverRoutes from './routes/routes.js'
import cors from 'cors'
import bodyParser from "body-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import verifyAccessTokenMiddleware from "./middlewares/verifyAccessTokenMiddleware.js";
import verifyRefreshTokensMiddleware from "./middlewares/verifyRefreshTokensMiddleware.js";


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin:[
      'http://localhost:8080/',
      'http://localhost:8080',
  ],
  credentials: true,
}));
app.use(verifyRefreshTokensMiddleware)
app.use(verifyAccessTokenMiddleware)
app.use(serverRoutes);
app.use(errorMiddleware)

const PORT = process.env.PORT || 9990;

app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}...`);
});
