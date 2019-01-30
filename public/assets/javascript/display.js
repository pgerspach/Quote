$(document).ready(() => {
  $("body").css("display","none");

  let browserWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  let browserHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  let containerCenterWidth = 500;
  let containerColumnWidth = containerCenterWidth / 2.2;

  let containerColumnSpace = containerCenterWidth * 0.06;

  let containerCutoff1 =
    containerCenterWidth + containerColumnSpace * 2 + containerColumnWidth * 2;

  let containerCutoff2 =
    containerCenterWidth + containerColumnSpace + containerColumnWidth;

  let containerCutoff3 = containerCenterWidth;
  let containerCutoff4 = 400;
  let activeCutoff = 1;

  let cutoffArray = [
    containerCutoff1,
    containerCutoff2,
    containerCutoff3,
    containerCutoff4
  ];
  let getInitialContainerWidth = function() {
    modOne = browserWidth / containerCutoff1;
    modTwo = browserWidth / containerCutoff2;
    modThree = browserWidth / containerCutoff3;
    modFour = browserWidth / containerCutoff4;
    switch (
      Math.min(
        modOne >= 1 ? modOne : 10,
        modTwo >= 1 ? modTwo : 10,
        modThree >= 1 ? modThree : 10,
        modFour >= 1 ? modFour : 10
      )
    ) {
      case modOne:
        activeCutoff = 1;
        return containerCutoff1;
        break;

      case modTwo:
        activeCutoff = 2;
        return containerCutoff2;
        break;

      case modThree:
        activeCutoff = 3;
        return containerCutoff3;
        break;
      case modFour:
        activeCutoff = 4;
        return containerCutoff4;
        break;
      default:
        activeCutoff = 1;
        return containerCutoff1;
        break;
    }
  };
  let containerWidth = getInitialContainerWidth();

  checkForSize(activeCutoff);

  setContainerWidths(containerWidth);
  setRest();

  $(window).resize(() => {
    changeSize();
  });

  function setContainerWidths(containerWidth) {
    $(".page_header").css(
      "padding",
      `5px calc(100% / 2 - ${containerWidth}px / 2) 5px
    calc(100% / 2 - ${containerWidth}px / 2)`
    );
    $(".new-quote-modal").css("width", `${cutoffArray[activeCutoff]}px`);
    $(".new-quote-modal").css("height", `${cutoffArray[activeCutoff]*.7}px`);
    $(".new-quote-modal").css(
      "left",
      `calc(100% / 2 - ${cutoffArray[activeCutoff]}px / 2)`
    );

    $(".container").css("width", `${containerWidth}px`);

  }

  function setRest() {
    $(".search-bar").css("width", `${containerCenterWidth * 0.35}px`);
    $(".profile-snapshot").css("height", `${0.52 * containerCenterWidth}`);
    $(".group-snapshot-item-image").css(
      "width",
      `${0.17 * containerCenterWidth}`
    );
    $(".group-snapshot-item-image").css(
      "height",
      `${0.17 * containerCenterWidth}`
    );

    $(".container-center").css("width", `${containerCenterWidth}px`);
    $(".container-left,.container-right").css(
      "width",
      `${containerColumnWidth}px`
    );
  }

  function checkForSize(activeCutoff) {
    switch (activeCutoff) {
      case 1:
        $(".container-center").css("width", `${containerCenterWidth}`);
        $(".container-left").css("display", "flex");
        $(".container-right").css("display", "flex");
        break;
      case 2:
        $(".container-center").css("width", `${containerCenterWidth}`);
        $(".container-left").css("display", "flex");
        $(".container-right").css("display", "none");
        break;
      case 3:
        $(".container-center").css("width", `${containerCenterWidth}`);
        $(".container-right").css("display", "none");
        $(".container-left").css("display", "none");
        break;
      case 4:
        $(".container-right").css("display", "none");
        $(".container-left").css("display", "none");
        $(".container-center").css("width", "100vw");
        setRest();
        break;
      default:
        $(".container-center").css("width", `${containerCenterWidth}`);
        $(".container-left").css("display", "flex");
        $(".container-right").css("display", "flex");
        break;
    }
  }

  function changeSize() {
    let windowSize = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );

    if (windowSize < containerWidth) {
      activeCutoff += 1;
      containerWidth = cutoffArray[activeCutoff - 1];
      checkForSize(activeCutoff);
      setContainerWidths(containerWidth);
    } else if (windowSize >= containerWidth) {
      if (windowSize > cutoffArray[activeCutoff - 2] && activeCutoff != 1) {
        activeCutoff -= 1;
        containerWidth = cutoffArray[activeCutoff - 1];
        checkForSize(activeCutoff);
        setContainerWidths(containerWidth);
      }
    }
  }
  $("body").css("display","block");
});
