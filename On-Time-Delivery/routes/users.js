import express from "express";
import { v4 as uuidv4  } from 'uuid';


const router = express.Router();

let users = []
 

//all routes are starting with /users
router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4()});
  res.send(
    `User with the name ${user.firstName} has been added to the database!`
  );
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
   const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
} );

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`User with the id ${id} has been deleted`)
})

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const { firstName, lastName, location } = req.body;
    
    const user = users.find((user) => user.id === id);
    if(firstName)user.firstName = firstName;
    
    if(lastName) user.lastName = lastName;
   
    if(location)user.location = location;
    res.send(`User with id ${id} has been updated`);
   
})
export default router;
