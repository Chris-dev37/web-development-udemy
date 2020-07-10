
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://admin-chris:4b8p8Pqx856s5xF@cluster0.iltur.mongodb.net/todolistDB", { useUnifiedTopology: true });

const itemSchema = {
    name: "String"
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todo list!"
});

const item2 = new Item({
    name: "Hit the + to add an item"
});

const item3 = new Item({
    name: "<-- Check this box to remove item"
});

const stockItems = [item1, item2, item3];


const listSchema = {
    name: "String",
    items: [itemSchema]
}

const List = mongoose.model("List", listSchema);


app.get("/", (req, res) => {

    Item.find({}, (err, docs) => {
        if (docs.length === 0) {
            Item.insertMany(stockItems, (err) => {
                return err ? console.log(err) : console.log("Stock items addded");
            });
            res.redirect("/");
        } else {
            res.render("list", {
                listName: "Today",
                addedItems: docs
            });
        }
    });
});

app.get("/:customListName", (req, res) => {

    const customName = _.capitalize(req.params.customListName);

    List.findOne({ name: customName }, (err, doc) => {
        if (!err) {
            if (!doc) {
                const list = new List({
                    name: customName,
                    items: stockItems
                })
                list.save();

                res.redirect("/" + customName);

            } else {
                res.render("list", {
                    listName: doc.name,
                    addedItems: doc.items
                });
            }
        }
    });
});

app.post("/", (req, res) => {

    const newItem = new Item({
        name: req.body.newItem
    });

    if (req.body.button === "Today") {
        newItem.save();
        res.redirect("/");

    } else {
        List.findOne({ name: req.body.button }, (err, doc) => {
            doc.items.push(newItem);
            doc.save();
            res.redirect("/" + req.body.button);
        });
    }

});

app.post("/delete", (req, res) => {

    if(req.body.listTitle === "Today"){
        Item.deleteOne({ _id: req.body.checkbox }, (err) => {
            return err ? console.log(err) : console.log("Item Deleted");
        });
    
        res.redirect("/");
    }else{
        List.findOneAndUpdate({name: req.body.listTitle}, {$pull: {items: {_id: req.body.checkbox}}}, (err, doc) => {
            if(!err){
                res.redirect("/" + req.body.listTitle);
            }
        });
    }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => console.log("Server Running"));