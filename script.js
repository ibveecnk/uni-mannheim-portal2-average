const appendText = (text, ele) => {
  const node = document.createElement("div");
  const textnode = document.createTextNode(text);

  node.appendChild(textnode);
  node.className = "info";
  //node.style.cssText = "font-weight: bold; margin: 5px;";
  ele.appendChild(node);
};

const main = () => {
  let tableEl = document.getElementsByTagName("table");
  let tableContentEl = document.getElementsByClassName("tabelle1_alignright");

  // Exit if the site is malformed (e.g. user session expired)
  if (tableEl.length < 1) {
    return;
  }

  let totalWeight = 0;
  let average = 0.0;

  let i = 0;
  let data = [];
  let tmp = {};

  console.info("Calculating...");

  for (let part of tableContentEl) {
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
      if(tmp.mark != 5.0) {
        data.push(tmp);
      }
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

  let tableElement = tableEl[1];
  let infoDiv = document.createElement("div");

  // Workaround to not inherit table formatting
  tableElement.parentNode.insertBefore(infoDiv, tableElement.nextSibling);

  infoDiv.className = "infoWrapper";

  appendText("Average Grade: " + average.toFixed(2), infoDiv);
  appendText("Total ECTS: " + totalWeight, infoDiv);
};

main();
