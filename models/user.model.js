const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: "FirstName is required" },
  lastName: { type: String, required: "LastName is required" },
  password: { type: String, required: "Password is required" },
  email: {
    type: String,
    unique: "Email id already exists",
    required: "Email id is required",
    validate: {
      validator: (value) => {
        return /^.+@.+\.com$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email Id`,
    },
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "address",
    },
  ],
});

const User = model("user", userSchema);
module.exports = { User };
