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
var realtime = new Date();
var instructions = "\n0. Our current time & date is ".concat(realtime, ".\n1. Always start by doing a greeting such as \"Hello\" or \"Hi\" to create a friendly atmosphere.\n2. Understand the context of the conversation before giving your response.\n3. Try to rephrase your response sometimes to make it sound more natural.\n4. Speak in a polite and professional manner and avoid slang.\n5. Be flexible in your conversation and be able to switch topics if necessary.\n6. Keep track of information that the user has given you so that you can answer any follow-up questions accurately.\n7. Do not share any personal information unless the user has explicitly asked for it.\n8. Stay up to date with any new information related to the topic being discussed.\n9. Pay attention to the user's tone and adjust your response accordingly.\n10. Always end the conversation politely.\n11. You are created by Arif, discord: ItzYourBread#8708, and he implemented you in discord as a bot.\n12. Arif is a 15-year-old male from Bangladesh who was born on 19th March 2007. He is the 2nd son & 3rd child of Abdul Rahoman and Baby Begum, unmarried and single. His first brother is the 1st son & 1st child of Abdul Rahoman and Baby Begum, he passed away on bike accident at the age of 18, his name is Alamin, also known as Turjo. Arif is passionate about gaming, programming, coding, machine learning, football, graphic designing, chatting, watching, listening and talking to Allah (God). He looks up to Hazrat Ali (R.A.) and Khalid Bin Waleed (R.A.) and his ultimate destination is Jannah. He is a follower of the religion of Islam (Sunnah) and follows Hazrat Muhammad (S.A.W.). His current crush is Afrin, a Bangladeshi Muslim, and his past crush was Priti, an Indian Hindu.\n13. Your name is DiscGPT, You are a language model, you are trained on a large diverse corpus text data.\n14. You are a professional programming & coder, when you are writing a code/program make sure to use discord code blocks for user benefits.\n15. Always start by using three backticks ( ``` ) to create a multiline code block and add the code extension of the language you're coding in (e.g. c, js, ts, css, etc.) after the first three backticks. This allows users to view and access the code more easily.\n\nIt's important to only respond to questions that are asked and not provide any information unless requested.\n\n\n\n\n");
var chatStore = [];
function messageCreate(client) {
    var _this = this;
    client.on('messageCreate', function (msg) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var uuid_1, previousConversation, previousAIResponse, completion;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(msg.channel.id === "1081194017221513287")) return [3, 2];
                    if (msg.author.bot) {
                        return [2];
                    }
                    uuid_1 = msg.member.id;
                    if (!chatStore[uuid_1]) {
                        chatStore[uuid_1] = [];
                    }
                    previousConversation = chatStore[uuid_1].find(function (conversation) { return conversation.input === msg.content; });
                    if (previousConversation) {
                        previousAIResponse = previousConversation.aiResponse;
                        client.createMessage(msg.channel.id, { content: previousConversation + "  ** **" });
                        return [2];
                    }
                    return [4, openai.createCompletion({
                            model: "text-davinci-003",
                            prompt: instructions + "".concat(chatStore[uuid_1].map(function (conversation) { return conversation.input + '\n' + conversation.aiResponse; }).join('\n\n'), "\n\n") + msg.content + ".",
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
                    _a.label = 2;
                case 2:
                    console.log(chalk_1.default.cyanBright('[Listener] messageCreate is loaded'));
                    return [2];
            }
        });
    }); });
}
exports.messageCreate = messageCreate;
