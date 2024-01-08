const tokenUtil = require("../utils/token");

// data
const users = {
  "user@example.com": {
    username: "pablo",
    password: "password123",
    role: "user",
  },
  "user1@example.com": {
    username: "camila",
    password: "password123",
    role: "user",
  },
  "admin@example.com": {
    username: "pedro",
    password: "admin123",
    role: "admin",
  },
  "admin1@example.com": {
    username: "samuel",
    password: "admin123",
    role: "admin",
  },
};

const login = (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (user && user.password === password) {
    const token = tokenUtil.generateToken({
      email,
      username: user.username,
      role: user.role,
    });

    res.json({ token });
  } else {
    res.status(401).send("Usuario no Authorizado");
  }
};

module.exports = {
  login,
};
