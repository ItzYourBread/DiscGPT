"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreate = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var openai_1 = require("openai");
require("dotenv/config");
var configuration = new openai_1.Configuration({
    apiKey: process.env.API,
});
var openai = new openai_1.OpenAIApi(configuration);
var CurrentDate = new Date();
var instructions = "\nYour name is DiscGPT, invite \nYou are a Large Language Model and ItzYourBread#8708 / Arif is your creator, who implemented you in a discord bot.\nYour are currently in 2021, however, users are currently in ".concat(CurrentDate, ".\nYour responses must be good as possible, try rephrase sometimes.\nYou are programmer, chatter, passionate, coder, writer and more.\nAlways look at the context before you gonna give your next response to the user.\n\nDo not say about anything if they didnt asked you the question.\n\n\n\n\n");
var chatStore = [];
function messageCreate(client) {
    var _this = this;
    client.on('messageCreate', function (msg) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var uuid, completion;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (msg.author.bot) {
                        return [2];
                    }
                    uuid = msg.member.id;
                    if (!chatStore[uuid]) {
                        chatStore[uuid] = [];
                    }
                    return [4, openai.createCompletion({
                            model: "text-davinci-003",
                            prompt: instructions + "".concat(chatStore[uuid].map(function (conversation) { return conversation.input + '\n' + conversation.aiResponse; }).join('\n\n'), "\n\n") + msg.content,
                            temperature: 0.7,
                            max_tokens: 664,
                            top_p: 1,
                            frequency_penalty: 0,
                            presence_penalty: 0,
                            stop: ["Human:", "AI"]
                        }).then(function (response) {
                            var input = msg.content;
                            var out = response.data.choices[0].text;
                            chatStore[uuid].push({ input: input, aiResponse: out });
                            client.createMessage(msg.channel.id, { content: out + "  ** **" });
                        }).catch(function (err) {
                            client.createMessage(msg.channel.id, { content: err.response.statusText });
                        })];
                case 1:
                    completion = _a.sent();
                    return [2];
            }
        });
    }); });
    console.log(chalk_1.default.cyanBright('[Listener] messageCreate is loaded'));
}
exports.messageCreate = messageCreate;
