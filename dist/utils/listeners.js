"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ready_1 = require("../listeners/ready");
var error_1 = require("../listeners/error");
var shardReady_1 = require("../listeners/shardReady");
var interactionCreate_1 = require("../listeners/interactionCreate");
var messageCreate_1 = require("../listeners/messageCreate");
exports.default = { ready: ready_1.ready, error: error_1.error, shardReady: shardReady_1.shardReady, interactionCreate: interactionCreate_1.interactionCreate, messageCreate: messageCreate_1.messageCreate };
