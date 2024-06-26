import { s } from "vitest/dist/reporters-LLiOBu3g";

const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<{ content: string }> => {
  const response = fetch(url)
    .then((res) => res.json())
    .catch(() => "<speak><s>There was an error</s></speak>");

  return response;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  if (!content.startsWith("<speak>")) {
    throw new Error("This is not valid ssml");
  }
  const contentWithoutSpeakTag = content.replace(/<\/?(speak|p)(>|$)/g, "");

  return contentWithoutSpeakTag
    .split("</s>")
    .filter((sentence) => sentence.includes("<s>"))
    .map((sentence) =>
      sentence.slice(sentence.indexOf("<s>")).replace("<s>", "")
    );
};

export { fetchContent, parseContentIntoSentences };
