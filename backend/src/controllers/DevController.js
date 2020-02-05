const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },
  async update(req, res) {
    const { github_username } = req.params;
    const { techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) return res.status(404).json({ error: "Dev not found." });

    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = response.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    await Dev.updateOne(
      { github_username },
      { techs: techsArray, location, name, avatar_url, bio }
    );

    dev = await Dev.findOne({ github_username });

    return res.json(dev);
  },
  async destroy(req, res) {
    const { github_username } = req.params;

    let dev = await Dev.findOne({ github_username });

    if (!dev) return res.status(404).json({ error: "Dev not found." });

    await Dev.deleteOne({ github_username });

    return res.json({ message: "Dev successfully deleted" });
  }
};
