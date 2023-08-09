# UXIG project

UXIG is the User Experience Interactive Generator Project. As this is a POC application, it demonstrates the viability of using ChatGPT to support the following:
- Persona's name
- Preferences for the generating stories
- Take a story abstract, and then have the LLM (ChatGTP OpenAI 3.5) to produce the
  * Stories with parameters, given in the Preferenes: number of stories, number of steps, number of words, story sentiment and variability (temperature) between each generation of stories. 

### Usage

- Make sure to install Deno: https://deno.land/manual/getting_started/installation
- Then start the project: And pointing to the host, Open the browser to http://localhost:8000 and go for it.
- For deployment on a server, following environment variables are needed:
  * "chatGptKey": "get this from ChatGP",
  * "mongoConnectionString": "mongodb+srv://{username}:{password}@servername/?authMechanism=SCRAM-SHA-1&authSource=uxig&retryWrites=true&w=majority&authSource=uxig", 
     ** See MongoDB Atlas.
```
deno task start
```
deno task test

