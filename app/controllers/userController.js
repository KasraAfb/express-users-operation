
const users = [
  {
    "firstName":"a1",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a2",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a3",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a4",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a5",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a6",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a7",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a8",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a9",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a10",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a11",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a12",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
  {
    "firstName":"a13",
    "lastName": "a1",
    "email": "a@a.com",
    "role":"admin"
  },
];

const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, role } = req.body;

  const user = users.find((user) => user.email === email);

  if (user) {
    res.status(400).send({ message: "User already exist!" });
    return;
  }

  const newUser = {
    id: (Math.random() + 1).toString(36).substring(5), // TODO: use uuid instead
    firstName,
    lastName,
    email,
    role
  }

  users.push(newUser);
  res.status(200).send(newUser);
};

const updateUser = async (req, res, next) => {
  const { firstName, lastName, email, role } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(404).send({ message: "User not found!" });
    return;
  }

  user.firstName = firstName ? firstName : user.firstName;
  user.lastName = lastName ? lastName : user.lastName;
  user.email = email ? email : user.email;
  user.role = role ? role : user.role;

  res.status(200).send({ message: "User edit successfully." });
};

const findUsersByRole = async (req, res) => {
  const { role } = req.query;

  const page = +req.query.page ?? 1;
  const count = +req.query.count ?? 10;

  const findUsers = users.filter((user) => user.role === role);

  if(!findUsers){
    res.status(200).send({ pages: 0, users: [] });
  }

  const start = (page - 1) * count;
  const end = start + count;
  const result = [];

  for (let i = start; findUsers && i< findUsers.length && i < end ; i++) {
    result.push(findUsers[i]);
  }

  res.status(200).send({count: findUsers.length,page, pages: Math.floor(findUsers.length / count) + 1, users: result });
};

const deleteUser = (req, res)=> {
  const userId = req.params.id;
  const userIndex = users.findIndex(user=> user.id===userId);

  if (userIndex == -1) {
    res.status(404).send({ message: "User not found!" });
    return;
  }

  users.splice(userIndex,1);
  res.status(204).send("User deleted successfully");
}

export { registerUser, updateUser, findUsersByRole, deleteUser };
