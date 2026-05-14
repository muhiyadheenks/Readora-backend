const Hero = require('../models/heroModel')

const getHero = async (req, res) => {
    const hero = await Hero.find()
    res.status(200).json(hero)
}
module.exports = {
    getHero
}