import express from "express";
import bodyParser from "body-parser";
import taskRouter from "./task/infrastructure/TaskRouter";
import userRouter from "./user/infraestructure/UserRouter";
import moment from 'moment';
import 'moment-timezone';
import fileUpload from "express-fileupload";


//Documentation
import swagger from 'swagger-ui-express';
import yaml from 'yamljs';
const swaggerDoc = yaml.load('swagger-config.yaml');

moment.tz.setDefault('America/Mexico_City');
const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(currentDateTime);

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use('/docs', swagger.serve, swagger.setup(swaggerDoc));

const port = parseInt(process.env.SERVER_PORT ?? "3000");

app.listen(port, () => {
  console.log('[Application] Server online in port ' + port)
});
