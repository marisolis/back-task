import express from "express";
import bodyParser from "body-parser";
import taskRouter from "./task/infrastructure/TaskRouter";
import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('America/Mexico_City');
const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(currentDateTime);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', taskRouter);

const port = parseInt(process.env.SERVER_PORT ?? "3000");

app.listen(port, () => {
  console.log('[Application] Server online in port ' + port)
});