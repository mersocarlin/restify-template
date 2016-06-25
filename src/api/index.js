import * as contact from './contact';


const wrap = fn => (...args) => fn(...args).catch(args[2]);


export default (app) => {
  app.get('/contacts', wrap(contact.list));
  app.get('/contacts/:id', wrap(contact.detail));
  app.post('/contacts', wrap(contact.create));
  app.post('/contacts/:id', wrap(contact.update));
  app.put('/contacts/:id', wrap(contact.update));
  app.del('/contacts/:id', wrap(contact.remove));


  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack || err); // eslint-disable-line no-console

    if (err) {
      res.sendStatus(500);
    }
  });
};
