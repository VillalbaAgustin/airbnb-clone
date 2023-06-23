const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require('./models/Booking')
const CookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const { ifError } = require("assert");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefrlhkl4gkk3b45g4kjgv";

app.use(express.json());
app.use(CookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

//*****  FUNCTIONS  *****//

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      resolve (userData)
    });
  })
};

//*****  TEST  *****//

app.get("/test", (req, res) => {
  res.json("test ok");
});

//*****  REGISTER  *****//

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

//*****  LOGIN  *****//

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

//*****  LOGOUT  *****//

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json(true);
});

//*****  PROFILE  *****//

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

//*****  UPLOAD PHOTO  *****//

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});


const photoMiddleware = multer({ dest: "uploads" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

//*****  PLACES   *****//

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;

    const placeDoc = await Place.create({owner: userData.id,title,address,photos: addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests, price});
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    const { id } = userData;

    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {

    const placeDoc = await Place.findById(id);

    if (userData.id == placeDoc.owner.toString()) {
      placeDoc.set({ owner: userData.id, title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price });
      await placeDoc.save();
      res.json('ok')
    } 
  });
});

app.get('/places', async (req, res) => {
  res.json( await Place.find() );
})

//*****  BOOKINGS   *****//

app.post('/bookings', async (req, res) => {

  const userData = await getUserDataFromReq(req);

  const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;
  Booking.create({
    place, checkIn, checkOut, numberOfGuests, name, phone, price, user: userData._id
  }).then((doc)=>{
    res.json(doc);
  }).catch((err)=>{
    if (err) throw err;
  } )
});

app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user: userData._id}).populate('place'))
});

app.listen(4000);
console.log("Servidor corriendo http://localhost:4000");
