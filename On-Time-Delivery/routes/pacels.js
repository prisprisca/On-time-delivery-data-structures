import express from "express";
import { v4 as uuidv4  } from 'uuid';


const router = express.Router();

let pacels = [];
 

//all routes are starting with /users
router.get("/", (req, res) => {
  res.send(pacels);
});

router.post("/", (req, res) => {
  const pacel = req.body;

  pacels.push({ ...pacel, id: uuidv4()});
  res.send(
    `pacel with the name ${pacel.name} has been added to the database!`
  );
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
   const foundUser = pacels.find((pacel) => pacel.id === id);
    res.send(foundUser);
} );

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    pacels = pacels.filter((pacel) => pacel.id !== id);
    res.send(`User with the id ${id} has been deleted`)
})

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const { name, weight, destination } = req.body;
    
    const pacel = pacels.find((pacel) => pacel.id === id);
    if(name)pacel.name = name;
    
    if(weight) pacel.weight = weight;
   
    if(destination)pacel.destination = destination;
    res.send(`pacel with id ${id} has been updated`);
   
})
export default router;
