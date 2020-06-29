import * as express from 'express';

const router = express.Router()
  .get('/setup/env', (req : express.Request, res : express.Response) : void => {
    res.status(200).send({
      test :'ff'
    })
  })

export default router;