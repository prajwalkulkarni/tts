import { useEffect, useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

let prevIndex = 0;
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const {
    play: playSpeech,
    pause: pauseSpeech,
    cancel,
    state,
    load,
  } = createSpeechEngine({
    onEnd: (e) => {
      if (currentSentenceIdx < sentences.length) {
        setCurrentSentenceIdx((prev) => prev + 1);
        prevIndex = currentSentenceIdx;
      } else {
        setCurrentSentenceIdx(0);
        prevIndex = 0;
      }
      setCurrentWordRange([0, 0]);
    },
    onStateUpdate: (state) => {
      setPlaybackState(state);
    },
    onBoundary: (e) => {
      if (e.name === "word") {
        const currentWord = sentences[currentSentenceIdx].slice(
          e.charIndex,
          e.charIndex + e.charLength
        );

        setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
      }
    },
  });

  if (prevIndex !== currentSentenceIdx) {
    load(sentences[currentSentenceIdx]);
    playSpeech();
    prevIndex = currentSentenceIdx;
  }

  const play = () => {
    load(sentences[currentSentenceIdx]);
    playSpeech();
  };
  const pause = () => {
    pauseSpeech();
  };

  console.log(currentSentenceIdx, currentWordRange, playbackState);

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    load,
  };
};

export { useSpeech };
