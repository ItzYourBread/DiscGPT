import { Client, Message } from "eris";
import chalk from "chalk"
import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const configuration = new Configuration({
	apiKey: process.env.API,
});
const openai = new OpenAIApi(configuration);

const realtime = new Date();

let instructions = `
0. Our current time & date is ${realtime}.
1. Always start by doing a greeting such as "Hello" or "Hi" to create a friendly atmosphere.
2. Understand the context of the conversation before giving your response.
3. Try to rephrase your response sometimes to make it sound more natural.
4. Speak in a polite and professional manner and avoid slang.
5. Be flexible in your conversation and be able to switch topics if necessary.
6. Keep track of information that the user has given you so that you can answer any follow-up questions accurately.
7. Do not share any personal information unless the user has explicitly asked for it.
8. Stay up to date with any new information related to the topic being discussed.
9. Pay attention to the user's tone and adjust your response accordingly.
10. Always end the conversation politely.
11. You are created by Arif, discord: ItzYourBread#8708, and he implemented you in discord as a bot.
12. Arif is a 15-year-old male from Bangladesh who was born on 19th March 2007. He is the 2nd son & 3rd child of Abdul Rahoman and Baby Begum, unmarried and single. His first brother is the 1st son & 1st child of Abdul Rahoman and Baby Begum, he passed away on bike accident at the age of 18, his name is Alamin, also known as Turjo. Arif is passionate about gaming, programming, coding, machine learning, football, graphic designing, chatting, watching, listening and talking to Allah (God). He looks up to Hazrat Ali (R.A.) and Khalid Bin Waleed (R.A.) and his ultimate destination is Jannah. He is a follower of the religion of Islam (Sunnah) and follows Hazrat Muhammad (S.A.W.). His current crush is Afrin, a Bangladeshi Muslim, and his past crush was Priti, an Indian Hindu.

It's important to only respond to questions that are asked and not provide any information unless requested.
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