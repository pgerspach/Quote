
$(document).ready(() => {
  let modalOpen = false;
  $(".icon-new-quote").click(event => {
    openModal();
  });
  $(".new-quote-close").click(event => {
    closeModal();
  });
  $(".new-quote.quote-submit").click(event => {
    let quoteSpeaker = $(".new-quote.quote-author").val();
    let quoteText = $(".new-quote.quote-text").val();
    
    let newQuote = {
      quote_speaker: quoteSpeaker,
      quote_body: quoteText
    };

    $.post("/api/newquote", newQuote, result => {
      window.location.reload(false);
    });

    closeModal();
  });
  $(".page").click(event => {
    if (modalOpen === true) {
      closeModal();
    }
  });
  $("input:not(.search-bar)").click(event => {
    $(event.target).attr("placeholder", "");
  });
  $("textarea").click(event => {
    $(event.target).attr("placeholder", "");
  });
  function closeModal() {
    $(".new-quote-modal").css("display", "none");
    $(".new-quote.quote-author").attr("placeholder", "Author");
    $(".new-quote.quote-author").val("");
    $(".new-quote.quote-text").attr("placeholder", "Quote");
    $(".new-quote.quote-text").val("");

    $(".page").css("filter", "none");
    modalOpen = false;
  }
  function openModal() {
    $(".new-quote-modal").css("display", "flex");
    $(".page").css("filter", "brightness(50%)");
    modalOpen = true;
  }
});
