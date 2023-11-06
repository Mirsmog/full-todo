import express from 'express';
export default express
  .Router()
  .get('/', (req: express.Request, res: express.Response) =>
    res.json({
      intro: 'Welcome to the Todo api 🎉',
      routes: ['/todo', '/todo/:id'],
    })
  );
