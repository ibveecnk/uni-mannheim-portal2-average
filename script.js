const appendText = (text) => {
  const node = document.createElement("div");
  const textnode = document.createTextNode(text);

  node.appendChild(textnode);
  node.style.cssText = "font-weight: bold; margin: 5px;";
  document.getElementsByTagName("table")[1].appendChild(node);
};

const main = () => {
  // Exit if the site is malformed (e.g. user session expired)
  if (document.getElementsByClassName("tabelle1_alignright").length < 1) {
    return;
  }

  let totalWeight = 0;
  let average = 0.0;

  let tableContent = document.getElementsByClassName("tabelle1_alignright");

  let i = 0;
  let data = [];
  let tmp = {};

  console.info("Calculating...");

  for (let part of tableContent) {
    let content = part.innerHTML;

    // Remove unnecessary tags from innerHTML -> only parsable numbers are left
    content = content.replace(/(<([^>]+)>)/gi, "").trim();

    if (i == 0) {
      totalWeight += parseInt(content);
      tmp.weight = parseInt(content);
      i++;
    } else if (i == 1) {
      tmp.mark = parseFloat(content.replace(",", "."));
      i++;
    } else {
      data.push(tmp);
      i = 0;
      tmp = {};
    }
  }

  data.forEach((ele) => {
    average += (ele.weight / totalWeight) * ele.mark;
  });

  console.info("Data:");
  console.table(data);

  console.info("Results:");
  console.info("Total ECTS: " + totalWeight);
  console.info("Average: " + average);

  appendText("Average: " + average.toFixed(2));
  appendText("Total ECTS: " + totalWeight);
};

main();
