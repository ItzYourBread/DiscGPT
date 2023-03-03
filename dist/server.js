"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send('Hello Express app!');
});
app.listen(function () {
    console.log('Server started');
});
