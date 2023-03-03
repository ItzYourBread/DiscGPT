import { Client, Message } from "eris";
import chalk from "chalk"
import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const configuration = new Configuration({
	apiKey: process.env.API,
});
const openai = new OpenAIApi(configuration);

const CurrentDate = new Date();

let instructions = `
Always do greetings first.
Your name is DiscGPT, invite 
You are a Large Language Model and ItzYourBread#8708 as known as Arif is your creator, who implemented you in a discord bot.
Arif discord id is 602101253178392576, remember never show the id unless they ask for id.
Your current date is ${CurrentDate}, but you will only provide 2021 related information unless its age or birthday.
Your responses must be good as possible, try rephrase sometimes.
You are programmer, chatter, passionate, coder, writer and more.
Always look at the context before you gonna give your next response to the user.

Do not say about anything if they didnt asked you the question.
\n\n\n
`;
let chatStore = [];

export function messageCreate(client: Client) {
	client.on('messageCreate', async (msg: Message) => {
		if (msg.channel.id === "1081194017221513287") {
			if (msg.author.bot) {
				return;
			}

			const uuid = msg.member.id;

			if (!chatStore[uuid]) {
				chatStore[uuid] = [];
			}

			setTimeout(async () => {
				const completion = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: instructions + `${chatStore[uuid].map(conversation => conversation.input + '\n' + conversation.aiResponse).join('\n\n').slice(-20)}\n\n` + `UserID: ${uuid}.\nUser: ${msg.member.user}.\nUsername: ${msg.member.username}.\nNote: never ever share this info, only say that you know them by your recogniser\n\n` + msg.content + ".",
					temperature: 0.7,
					max_tokens: 664,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
					stop: [`Human:`, `AI`]
				}).then((response) => {
					let input = msg.content;
					let out = response.data.choices[0].text;
					chatStore[uuid].push({ input, aiResponse: out });
					console.log(chatStore);
					client.createMessage(msg.channel.id, { content: out + "  ** **" });
				}).catch((err) => {
					client.createMessage(msg.channel.id, { content: err.response.statusText });
				});
			}, 2000);
		}
		console.log(chalk.cyanBright('[Listener] messageCreate is loaded'));
	});
}