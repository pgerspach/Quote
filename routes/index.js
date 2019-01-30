module.exports = function(router, Firebase){
    router = require("../routes/htmlRoutes.js")(router, Firebase);
    router = require("../routes/authRoutes.js")(router, Firebase);
    router = require("./apiRoutes")(router);
    return router;
};
