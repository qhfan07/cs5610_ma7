const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// replace this string with your full name
const name = "Qianhao Fan"

console.log(`My name is ${name}`)

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function(req, res) {
    res.json(myPokemon);
});

router.post('/', (req, res) => {
    const { name, level, health } = req.body;
    if (myPokemon.some(pokemon => pokemon.name === name)) {
        return res.status(400).json({ error: "Pokemon with this name already exists" });
    }
    const newPokemon = {
        id: uuid(),
        name,
        level: level || Math.floor(Math.random() * 10) + 1,
        health: health || Math.floor(Math.random() * 91) + 10
    };
    myPokemon.push(newPokemon);
    res.status(200).json(newPokemon);
});

router.get('/:pokemonId', function (req, res) {
    // return pokemon if one is found matching the pokemonId
    // return a 404 if no pokemon matches that pokemonId
    const pokemon = myPokemon.find(p => p.id === req.params.pokemonId);
    if (!pokemon) {
        return res.status(404).json({ error: "Pokemon not found" });
    }
    res.json(pokemon);
});

router.put('/:pokemonId', function(req, res) {
    // update the pokemon matching the pokemonId
    // based on the req body
    // return a 404 if no pokemon matches that pokemonId  
    const index = myPokemon.findIndex(p => p.id === req.params.pokemonId);
    if (index === -1) {
        return res.status(404).json({ error: "Pokemon not found" });
    }
    myPokemon[index] = { ...myPokemon[index], ...req.body };
    res.json(myPokemon[index]);
})

router.delete('/:pokemonId', function(req, res) {
    // delete pokemon if pokemonId matches the id of one
    // return 200 even if no pokemon matches that Id
    const index = myPokemon.findIndex(p => p.id === req.params.pokemonId);
    if (index !== -1) {
        myPokemon.splice(index, 1);
    }
    res.status(200).json({ message: "Pokemon deleted" });
})

module.exports = router;