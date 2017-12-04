"use strict";
const UTILITIES = {
  "toObject" : function(map) {
    return Array.from(map).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value })
    ), {});
  }
}


const TAMIL_VOWELS_FULL = {
  "அ": { "iso": "a", "compoundForm": ""},
  "ஆ": { "iso": "ā", "compoundForm": "ா"},
  "இ": { "iso": "i", "compoundForm": "ி"},
  "ஈ": { "iso": "ī", "compoundForm": "ீ"},
  "உ": { "iso": "u", "compoundForm": "ு"},
  "ஊ": { "iso": "ū", "compoundForm": "ூ"},
  "எ": { "iso": "e", "compoundForm": "ெ"},
  "ஏ": { "iso": "ē", "compoundForm": "ே"},
  "ஐ": { "iso": "ai", "compoundForm": "ை"},
  "ஒ": { "iso": "o", "compoundForm": "ொ"},
  "ஓ": { "iso": "ō", "compoundForm": "ோ"},
  "ஒள": { "iso": "au", "compoundForm": "ௌ"}
};
const TAMIL_VOWELS_COMPOUND = UTILITIES.toObject(
  new Map(
    Object.values(TAMIL_VOWELS_FULL).map(
      (val, i) => [val.compoundForm, {"iso" : val.iso}]
    )
  )
);
const TAMIL_CONSONANTS_VALLINAM = {
  "க" : {
    "iso": {
      "hard" : "k",
      "medium" : "g",
      "soft" : "h"
    }
  },
  "ச" : {
    "iso": {
      "hard" : "c",
      "medium" : "j",
      "soft" : "s"
    }
  },
  "ட" : {
    "iso": {
      "hard" : "ṭ",
      "medium" : "ṭ",
      "soft" : "ṭ"
    }
  },
  "த" : {
    "iso": {
      "hard" : "t",
      "medium" : "t",
      "soft" : "t"
    }
  },
  "ப" : {
    "iso": {
      "hard" : "p",
      "medium" : "b",
      "soft" : "b"
    }
  },
  "ற" : {
    "iso": {
      "hard" : "ṟ",
      "medium" : "ṟ",
      "soft" : "ṟ"
    }
  }
};
const TAMIL_CONSONANTS_IDAYINAM = {
  "ய" : {
    "iso" : {
      "hard" : "y",
      "medium" : "y",
      "soft" : "y"
    }
  },
  "ர" : {
    "iso" : {
      "hard" : "r",
      "medium" : "r",
      "soft" : "r"
    }
  },
  "ல" : {
    "iso" : {
      "hard" : "l",
      "medium" : "l",
      "soft" : "l"
    }
  },
  "வ" : {
    "iso" : {
      "hard" : "v",
      "medium" : "v",
      "soft" : "v"
    }
  },
  "ழ" : {
    "iso" : {
      "hard" : "ḻ",
      "medium" : "ḻ",
      "soft" : "ḻ"
    }
  },
  "ள" : {
    "iso" : {
      "hard" : "ḷ",
      "medium" : "ḷ",
      "soft" : "ḷ"
    }
  }
};
const TAMIL_CONSONANTS_MELLINAM = {
  "ங" : {
    "iso" : {
      "hard" : "ṅ",
      "medium" : "ṅ",
      "soft" : "ṅ"
    }
  },
  "ஞ" : {
    "iso" : {
      "hard" : "ñ",
      "medium" : "ñ",
      "soft" : "ñ"
    }
  },
  "ண" : {
    "iso" : {
      "hard" : "ṇ",
      "medium" : "ṇ",
      "soft" : "ṇ"
    }
  },
  "ந" : {
    "iso" : {
      "hard" : "n",
      "medium" : "n",
      "soft" : "n"
    }
  },
  "ம" : {
    "iso" : {
      "hard" : "m",
      "medium" : "m",
      "soft" : "m"
    }
  },
  "ன" : {
    "iso" : {
      "hard" : "ṉ",
      "medium" : "ṉ",
      "soft" : "ṉ"
    }
  }
};

const TAMIL_CONSONANTS = Object.assign(
  {},
  TAMIL_CONSONANTS_VALLINAM,
  TAMIL_CONSONANTS_IDAYINAM,
  TAMIL_CONSONANTS_MELLINAM
);

// Hard
const isVallinam = (glyph) =>
  Object.keys(TAMIL_CONSONANTS_VALLINAM).includes(glyph);
// Medium
const isIdayinam = (glyph) =>
  Object.keys(TAMIL_CONSONANTS_IDAYINAM).includes(glyph);
// Soft
const isMellinam = (glyph) =>
  Object.keys(TAMIL_CONSONANTS_MELLINAM).includes(glyph);
const isBorrowed = (glyph) => ["ஜ","ஷ","ஸ","ஹ"].includes(glyph);
const isConsonant = (glyph) =>
  isVallinam(glyph) || isIdayinam(glyph) || isMellinam(glyph) || isBorrowed(glyph);
const isFullVowel = (glyph) =>
  Object.keys(TAMIL_VOWELS_FULL).includes(glyph);
const isCompoundVowel = (glyph) =>
  Object.keys(TAMIL_VOWELS_COMPOUND).includes(glyph);
const isVowel = (glyph) =>
  isFullVowel(glyph) || isCompoundVowel(glyph);
const isVirama = (glyph) =>
  glyph === "்";
const isTamil = (glyph) =>
  isConsonant(glyph) || isVowel(glyph) || isVirama(glyph);

const isMuted = (word, index) =>
  word.length > index + 1 && isVirama(word[index + 1]);
const hasCompoundSibling = (word, index) =>
  word.length > index + 1 &&
  (
    isVirama(word[index + 1]) ||
    isCompoundVowel(word[index + 1])
  );
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
  {
    return index > 0 &&
    (
      isVowel(word[index - 1]) ||
      !isMuted(word[index - 1])
    ) &&
    (
      !isMuted(word[index]) ||
      isVowel(word[index + 1])
    )
  };

const getPronunciation = (word, index) => {
  if (!isTamil(word[index])) {
    return word[index];
  } else if (isVirama(word[index])) {
    return "";
  } else if (isFullVowel(word[index])) {
    return TAMIL_VOWELS_FULL[word[index]].iso;
  } else if (isCompoundVowel(word[index])) {
    return TAMIL_VOWELS_COMPOUND[word[index]].iso;
  } else if (
    index === 0 ||
    isMuted(word,index) ||
    isGeminated(word,index) ||
    isPostMutedVallinam(word,index)
  ) {
    return (
      TAMIL_CONSONANTS[word[index]].iso.hard +
      (!hasCompoundSibling(word, index) ? "a" : "")
    );
  } else if (
    isPostMutedMellinam(word, index) ||
    isPostMutedIdayinam(word, index)
  ) {
    return TAMIL_CONSONANTS[word[index]].iso.medium;
  } else if (
    isBetweenTwoVowels(word, index)
  ) {
    return TAMIL_CONSONANTS[word[index]].iso.soft +
      (!hasCompoundSibling(word, index) ? "a" : "")
  } else {
    return (
      TAMIL_CONSONANTS[word[index]].iso.hard +
      (!hasCompoundSibling(word, index) ? "a" : "")
    );
  }
}

const getTamilString = (word, index) => {
  return "FEATURE COMING SOON";
}

