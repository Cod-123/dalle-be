
import express from 'express';
import * as dotenv from 'dotenv';

//these are basically classes in order to set up the api key and fetch the data (part of the openai api documentation)
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

//this is similar to an object of the class OpenAIApi
const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

//post req to openai api to create the image
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body; // prompt is the text input by the user

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json', //base 64 json format is used to send the image
    });

    const image = aiResponse.data.data[0].b64_json;//method to process the image

    res.status(200).json({ photo: image });// sending as a json response
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;