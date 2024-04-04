const mongoose = require("mongoose");
const bycrpt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // Email validation regex
      validate: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
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
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
      minLength: ['10', "Phone number must be at least of 10 digits long."],
      maxLength: ['10', "Phone number must not exceeds 10 digits."],
    //   match: [/^\+91\s\d{10}$/, "Please fill a valid mobile number."]
    },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    profilePicture: { type: String }, // URL to the profile picture
  },
  { timestamps: true }
);

userSchema.pre("save", function (){
    let salt = bycrpt.genSaltSync(10);
    this.password = bycrpt.hashSync(this.password, salt);
})

userSchema.methods.comparePassword = function (password) {
    return bycrpt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
