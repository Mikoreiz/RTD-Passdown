var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/rtd-passdown", {
  useNewUrlParser: true
});
var Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.moment = require("moment");

//SCHEMA OF BUS
var bus = new Schema({
  busNumber: Number,
  type: String,
  date: Date,
  noPart: String,
  reason: String,
  description: String,
  fixed: { type: String, default: "False" },
  dateFixed: { type: Date, default: Date() }
});

var addBus = mongoose.model("holdbus", bus);

//ADDS NEW BUS FROM FORM
app.post("/submit", function(request, response) {
  new addBus({
    busNumber: request.body.inputBus,
    type: request.body.inputType,
    date: request.body.inputDate,
    noPart: request.body.inputNoPart,
    reason: request.body.inputReason,
    description: request.body.inputDesc,
    fixed: "False",
    fixDate: Date()
  }).save(function(err) {
    if (err) {
      response.redirect("/");
    } else {
      console.log("Bus has been saved");
    }
    response.redirect("/");
  });
});

//RETRIEVES BUS ON HOLD
app.get("/", function(request, response) {
  addBus.find({ fixed: "False" }, function(err, addBus) {
    if (err) {
      response.status(500).send({ error: "Could not fetch data" });
    } else {
      response.render("index", {
        addBus: addBus
      });
    }
  });
});

//RETRIEVES HISTORY OF BUSES BREAKDOWNS
app.get("/search", function(request, response) {
  var searchFilter = {};
  searchFilter["fixed"] = "True";
  if (request.query.searchNum) {
    searchFilter["busNumber"] = request.query.searchNum;
  }
  if (request.query.searchType) {
    searchFilter["type"] = request.query.searchType;
  }
  if (request.query.searchTo) {
    searchFilter["date"] = {
      $gte: request.query.searchFrom,
      $lt: request.query.searchTo
    };
  }
  addBus.find(searchFilter, function(err, addBus) {
    if (err) {
      response.status(500).send({ error: "Could not fetch data" });
    } else {
      response.render("mainArch", {
        addBus: addBus
      });
    }
  });
});

app.get("/archive", function(request, response) {
  addBus.find({ fixed: "True" }, function(err, addBus) {
    if (err) {
      console.log("Could not fetch data");
    } else {
      response.render("mainArch", {
        addBus: addBus
      });
    }
  });
});

//VIEW OF CURRENT BUSES ON HOLD FOR MECHANICS
app.get("/screen", function(request, response) {
  addBus.find({ fixed: "False" }, function(err, addBus) {
    if (err) {
      response.status(500).send({ error: "Could not fetch data" });
    } else {
      response.render("screen", {
        addBus: addBus
      });
    }
  });
});

//MOVES YOU TO UPDATE PAGE
app.get("/toEditPage/:_id", function(request, response) {
  addBus.findById(request.params._id, function(err, obj) {
    if (err) {
      console.log("Could not find");
    } else {
      response.render("update", { editBus: obj });
      console.log("Moved to edit page");
    }
  });
});

//UPDATES STATUS OF BUS THROUGH FORM
app.post("/updateBus/:_id", function(request, response) {
  var updatedBus = {
    busNumber: request.body.upBus,
    type: request.body.upType,
    date: request.body.upDate,
    noPart: request.body.upNoPart,
    reason: request.body.upReason,
    description: request.body.upDesc,
    fixed: request.body.fixed,
    dateFixed: Date()
  };
  addBus.findOneAndUpdate(
    { _id: request.params._id },
    updatedBus,
    { upsert: true, new: true },
    function(err, doc) {
      if (err) {
        console.log("Could not update");
      } else {
        console.log("Updated");
        response.redirect("/");
      }
    }
  );
});

//DELETES RECORD OF BUS
app.get("/delete/:_id", function(request, response) {
  addBus.deleteOne({ _id: request.params._id }, function(err) {
    if (err) {
      console.log("Could not remove");
    } else {
      console.log("Removed");
      response.redirect("/");
    }
  });
});

app.listen(3000, function() {
  console.log("Passdown running on port 3000...");
});
