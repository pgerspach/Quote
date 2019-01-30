const inflections = {
  mocking: function(quote) {
    let newQuote = "";
    for (let letter of quote) {
      if (letter.match(/[A-Za-z]/)) {
        newQuote +=
          Math.floor(Math.random() * 6) < 4
            ? letter.toLowerCase()
            : letter.toUpperCase();
      } else {
        newQuote += letter;
      }
    }
    return newQuote;
  },
  yelling:function(quote){
      return(quote.toUpperCase());
  },
  slowThinking:function(quote){
      return(quote.replace(/\s/g, "... ").toLowerCase());
  },
  seductive:function(quote){
    return quote + " \u{1F60F}";
  }
};
module.exports = inflections;
// console.log(inflections.mocking("Yo what is good my homies?"));
