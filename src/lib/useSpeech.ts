import { useEffect, useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const {
    play: playSpeech,
    pause: pauseSpeech,
    cancel,
    state,
    load,
  } = createSpeechEngine({
    onEnd: (e) => {
      setPlaybackState("ended");
      if (currentSentenceIdx < sentences.length) {
        setCurrentSentenceIdx((prev) => prev + 1);
      }
    },
    onStateUpdate: (state) => {
      setPlaybackState(state);
    },
    onBoundary: (e) => {
      console.log(e);
    },
  });

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  useEffect(() => {
    if (currentSentenceIdx > 0) {
      play();
    }
  }, [currentSentenceIdx]);

  const play = () => {
    setPlaybackState("playing");
    load(sentences[currentSentenceIdx]);
    playSpeech();
  };
  const pause = () => {
    setPlaybackState("paused");
    pauseSpeech();
  };

  const resetPlaybackState = () => {
    setCurrentSentenceIdx(0);
    setCurrentWordRange([0, 0]);
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    load,
    resetPlaybackState,
  };
};

export { useSpeech };
