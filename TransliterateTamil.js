"use strict";

const CharSet = {
  "அ" : {
    "glyph": "அ",
    "iso" : "a"
  },
  "க" : {
    "glyph": "க",
    "iso": {
      "hard" : "k",
      "medium" : "g",
      "soft" : "h"
    }
  }
};

// Hard consonant
const isVallinam = (glyph) =>
  ["க","ச","ட","த","ப","ற"].includes(glyph);
// Medium consonant
const isIdayinam = (glyph) =>
  ["ய","ர","ல","வ","ழ","ள"].includes(glyph);
// Soft consonant
const isMellinam = (glyph) =>
 ["ங","ஞ","ண","ந","ம","ன"].includes(glyph);
const isConsonant = (glyph) =>
  isVallinam(glyph) || isIdayinam(glyph) || isMellinam(glyph);
const isFullVowel = (glyph) =>
  ["அ","ஆ","இ","ஈ","உ","ஊ","எ","ஏ","ஐ","ஒ","ஓ","ஒள"].includes(glyph);
const isCompoundVowel = (glyph) =>
  ["ா","ி","ீ","ு","ூ","ெ","ே","ை","ொ","ோ","ௌ"].includes(glyph);
const isVowel = (glyph) =>
  isFullVowel(glyph) || isCompoundVowel(glyph);
const isVirama = (glyph) =>
  glyph === "்";
const isTamil = (glyph) =>
  isConsonant(glyph) || isVowel(glyph) || isVirama(glyph);

const isMuted = (word, index) =>
  word.length > index + 1 && isVirama(word[index + 1]);
const isGeminated = (word, index) =>
  word.length > index + 1 && word[index + 1] === word[index];
const isPostMutedVallinam = (word, index) =>
  (
    index > 1 &&
    word[index - 1] === "்" &&
    isVallinam(word[index - 2])
  );
const isPostMutedMellinam = (word, index) =>
  (
    index > 1 &&
    word[index - 1] === "்" &&
    isMellinam(word[index - 2])
  );
const isPostMutedIdayinam = (word, index) =>
  (
    index > 1 &&
    word[index - 1] === "்" &&
    isIdayinam(word[index - 2])
  );
const isBetweenTwoVowels = (word, index) =>
  (
    index > 0 &&
    word.length > index + 1 &&
    isVowel(word[index - 1]) &&
    isFullVowel(word[index + 1])
  );

const getPronunciation = (word, index) => {
  if (!isTamil(word[index])) {
    return word[index];
  } else if (isVirama(word[index])) {
    return "";
  } else if (isVowel(word[index])) {
    return CharSet[word[index]].iso;
  } else if (
    index === 0 ||
    isMuted(word,index) ||
    isGeminated(word,index) ||
    isPostMutedVallinam(word,index)
  ) {
    return (
      CharSet[word[index]].iso.hard +
      (!isMuted(word, index) ? "a" : "")
    );
  } else if (
    isPostMutedMellinam(word, index) ||
    isPostMutedIdayinam(word, index)
  ) {
    return CharSet[word[index]].iso.medium;
  } else if (
    isBetweenTwoVowels(word, index)
  ) {
    return CharSet[word[index]].iso.soft;
  } else {
    return (
      CharSet[word[index]].iso.hard +
      (!isMuted(word, index) ? "a" : "")
    );
  }
}

const getTamilString = (word, index) => {
  return "FEATURE COMING SOON";
}

