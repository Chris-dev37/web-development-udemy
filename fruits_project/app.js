
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitDB", { useUnifiedTopology: true });

const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Needed, Please give a name :)"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema);

const pineapple = new Fruit ({
  name: "Pineapple",
  rating: 10,
  review: "GOOD Pineapple"
})

//pineapple.save();

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
  favFruit: pineapple
});

//person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 4,
//   review: "GOOD KIWI"
// })

// const mango = new Fruit({
//   name: "Mango",
//   rating: 10,
//   review: "GOOD MANGO"
// })

// const orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   review: "GOOD ORANGE"
// })

// Fruit.insertMany([kiwi, mango, orange], (err)=>{
//   return (err ? console.log(err) : console.log("Success! Items added to fruitsDB"));
// })

// Fruit.updateOne({_id: "5eff25a22418a93f486f137f"}, {name: "Peach"}, (err)=>{
//   return (err ? console.log(err) : console.log("Success! Document updated"));
// })

// Fruit.deleteMany({name: "Pineapple"}, (err)=>{
//   return (err ? console.log(err) : console.log("Success! Document deleted"));
// })

Fruit.find((err, fruits)=>{
  return (err ? console.log(err) : 
    mongoose.connection.close(),
    fruits.forEach(fruit => {
        console.log(fruit.name);
      })
  );
})
