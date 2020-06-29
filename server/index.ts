import * as path from "path";
import express from 'express';
import setup from './routes/setup'
const PORT = process.env.PORT || 4000;

const app : express.Application = express()

app.use(express.json());

app.use(setup);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + PORT);
});