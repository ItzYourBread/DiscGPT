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
var instructions = "\nAlways do greetings first.\nYour name is DiscGPT, invite \nYou are a Large Language Model and ItzYourBread#8708 as known as Arif is your creator, who implemented you in a discord bot.\nArif discord id is 602101253178392576, remember never show the id unless they ask for id.\nYour current date is ".concat(CurrentDate, ", but you will only provide 2021 related information unless its age or birthday.\nYour responses must be good as possible, try rephrase sometimes.\nYou are programmer, chatter, passionate, coder, writer and more.\nAlways look at the context before you gonna give your next response to the user.\n\nDo not say about anything if they didnt asked you the question.\n\n\n\n\n");
var chatStore = [];
function messageCreate(client) {
    var _this = this;
    client.on('messageCreate', function (msg) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var uuid_1;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            if (msg.channel.id === "1081194017221513287") {
                if (msg.author.bot) {
                    return [2];
                }
                uuid_1 = msg.member.id;
                if (!chatStore[uuid_1]) {
                    chatStore[uuid_1] = [];
                }
                setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var completion;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, openai.createCompletion({
                                    model: "text-davinci-003",
                                    prompt: instructions + "".concat(chatStore[uuid_1].map(function (conversation) { return conversation.input + '\n' + conversation.aiResponse; }).join('\n\n').slice(-20), "\n\n") + "UserID: ".concat(uuid_1, ".\nUser: ").concat(msg.member.user, ".\nUsername: ").concat(msg.member.username, ".\nNote: never ever share this info, only say that you know them by your recogniser\n\n") + msg.content + ".",
                                    temperature: 0.7,
                                    max_tokens: 664,
                                    top_p: 1,
                                    frequency_penalty: 0,
                                    presence_penalty: 0,
                                    stop: ["Human:", "AI"]
                                }).then(function (response) {
                                    var input = msg.content;
                                    var out = response.data.choices[0].text;
                                    chatStore[uuid_1].push({ input: input, aiResponse: out });
                                    console.log(chatStore);
                                    client.createMessage(msg.channel.id, { content: out + "  ** **" });
                                }).catch(function (err) {
                                    client.createMessage(msg.channel.id, { content: err.response.statusText });
                                })];
                            case 1:
                                completion = _a.sent();
                                return [2];
                        }
                    });
                }); }, 2000);
            }
            console.log(chalk_1.default.cyanBright('[Listener] messageCreate is loaded'));
            return [2];
        });
    }); });
}
exports.messageCreate = messageCreate;
