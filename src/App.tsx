import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  // const { currentWord, currentSentence, controls, play, pause } = useSpeech(sentences);
  const { play, pause, currentSentenceIdx, currentWordRange, playbackState } =
    useSpeech(sentences);

  const getContent = useCallback(() => {
    (async () => {
      const content = await fetchContent();
      const sentences = parseContentIntoSentences(content.content);
      setSentences(sentences);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentWordRange={currentWordRange}
          currentSentenceIdx={currentSentenceIdx}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          state={playbackState}
          loadNewContent={getContent}
        />
      </div>
    </div>
  );
}

export default App;
