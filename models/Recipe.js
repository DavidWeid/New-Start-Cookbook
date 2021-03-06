const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  creator: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  instructionSteps: {
    type: Array,
    required: true
  },
  source: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    required: false
  }
});

module.exports = Recipe = mongoose.model("Recipe", RecipeSchema);
