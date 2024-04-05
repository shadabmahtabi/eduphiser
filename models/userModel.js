const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // Email validation regex
      validate: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      //   validate: {
      //     validator: function (v) {
      //       // Password validation regex: at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
      //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      //         v
      //       );
      //     },
      //     message: (props) =>
      //       `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!`,
      //   },
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
      minLength: ["10", "Phone number must be at least of 10 digits long."],
      maxLength: ["10", "Phone number must not exceeds 10 digits."],
      //   match: [/^\+91\s\d{10}$/, "Please fill a valid mobile number."]
    },
  },
  { timestamps: true }
);

/*
  This function runs when .save() method is called and hash the password.
*/
userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bycrpt.genSaltSync(10);
  this.password = bycrpt.hashSync(this.password, salt);
});

/*
    This method is used to compare the passwords and returns true or false.
*/
userSchema.methods.comparePassword = function (password) {
  return bycrpt.compareSync(password, this.password);
};

/*
    This method is used to create jwt token.
*/
userSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
