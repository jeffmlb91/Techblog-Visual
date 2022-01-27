const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

// create database
const sequelize = require("./config/connection");

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Diarrhea at Barnes and Noble",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({
  helpers: {
    format_date: (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear()}`;
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  sequelize.sync({ force: false });
});

// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const routes = require('./controllers');
// const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');

// //session setup
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(routes);

// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

// const express = require("express");
// const routes = require("./routes");
// const sequelize = require("./config/connection");

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log(`APP listening on port ${PORT}`));
// });
