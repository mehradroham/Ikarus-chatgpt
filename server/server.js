import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import OpenAI from 'openai';

dotenv.config()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });




const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from IKARUS!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

 

   
    const response = await openai.completions.create({
        model: "davinci-002",
        prompt:  `${prompt}`,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0.52,
        presence_penalty: 0,
      });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))