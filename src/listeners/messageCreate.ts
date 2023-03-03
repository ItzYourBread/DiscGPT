import { Client, Message } from "eris";
import chalk from "chalk"
import {Configuration, OpenAIApi} from "openai";
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
Arif discord id is 943855772415193118.
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
		if (msg.author.bot) {
			return;
		}
		
		const uuid = msg.member.id;

		if (!chatStore[uuid]) {
			chatStore[uuid] = [];
        }

		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: instructions + `${chatStore[uuid].map(conversation => conversation.input + '\n' + conversation.aiResponse).join('\n\n')}\n\n` + msg.content,
			temperature: 0.7,
			max_tokens: 664,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			stop: [`Human:`, `AI`]
		}).then((response) => {
			let input = msg.content;
			let out = response.data.choices[0].text;
			chatStore[uuid].push({input, aiResponse: out});
		    client.createMessage(msg.channel.id, { content: out + "  ** **" });
		}).catch((err) => {
		    client.createMessage(msg.channel.id, { content: err.response.statusText });
		});
	});
	console.log(chalk.cyanBright('[Listener] messageCreate is loaded'));
}