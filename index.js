const express = require("express")

const server = express()

server.use(express.jsaon())

server.get("/", (req, res) => {
  res.json({ message: "hello, world" })
})

server.get("/users", (req, res) => {
  const users = db.getUsers()
  res.json(users)
})

server.get("/users/:id", (req, res) => {
  const userId = req.params.userId
  const user = db.getUserById(userId)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: "User not found"
    })
  }
})

server.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Need a user name!"
    })
  }

  const newUser = db.createUser({
    name: req.body.name
  })

  res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
    })

    res.json(updatedUser)
  } else {
    res.status(404).json({
      message: "User not found",
    })  
  }
})

server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    db.deleteUser(user.id)
    res.status(204).end()
  } else {
      res.status(404).json({
      message: "User not found",
    })
  }
})

server.listen(8080, () => {
  console.log("server started at port 8080")
});