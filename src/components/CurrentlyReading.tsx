/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const currentSentence = sentences[currentSentenceIdx];
  const modifiedSentence =
    currentSentence?.slice(0, currentWordRange[0]) +
    '<span style="color:red" data-testid="current-word">' +
    currentSentence?.slice(currentWordRange[0], currentWordRange[1]) +
    "</span>" +
    currentSentence?.slice(currentWordRange[1]);
  return (
    <div data-testid="currently-reading">
      <h1>
        <p
          data-testid="current-sentence"
          dangerouslySetInnerHTML={{
            __html: currentSentence ? modifiedSentence : "",
          }}
        ></p>
      </h1>
      {sentences.join(" ")}
    </div>
  );
};
