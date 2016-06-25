import restify from 'restify';


let contacts = [];
for (let i = 1; i <= 50; i++) {
  contacts.push({
    id: i,
    name: `contact ${i}`,
  });
}

export async function list (req, res) {
  res.send(200, contacts);
}


export async function detail (req, res) {
  const contact = contacts.find(c => c.id === parseInt(req.params.id, 10));
  if (!contact) {
    res.send(new restify.errors.NotFoundError('Not found!'));
    return;
  }
  res.send(200, contact);
}


export async function create (req, res) {
  const contact = { id: contacts.length + 1, ...req.body };

  contacts.push(contact);

  res.send(201, contact);
}


export async function update (req, res) {
  req.body.id = req.params.id; // eslint-disable-line no-param-reassign

  let result;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === parseInt(req.params.id, 10)) {
      contacts[i].name = req.body.name;
      result = contacts[i];
      break;
    }
  }

  if (!result) {
    res.send(new restify.errors.NotFoundError('Not found!'));
    return;
  }

  res.send(200, result);
}


export async function remove (req, res) {
  contacts = contacts
    .filter(contact => contact.id !== parseInt(req.params.id, 10));

  res.send(200);
}
