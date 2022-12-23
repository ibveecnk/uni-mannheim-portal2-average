const appendText = (text, ele) => {
    const node = document.createElement("div");
    const textnode = document.createTextNode(text);

    node.appendChild(textnode);
    node.className = "ivinfo";
    ele.appendChild(node);
};

const main = () => {
    let tableEl = document.getElementsByTagName("table");
    let tableContentEl = document.getElementsByClassName("tabelle1_alignright");

    // Exit if the site is malformed (e.g. user session expired)
    if (tableEl.length < 1) {
        return;
    }

    console.info("Calculating...");

    let data = new Array();
    let dataEntry = new Object();
    let totalWeight = 0;
    let i = 0;
    for (let part of tableContentEl) {
        let content = part.innerHTML;

        // Remove unnecessary tags from innerHTML -> only parsable numbers are left
        content = content.replace(/(<([^>]+)>)/gi, "").trim();

        switch (i) {
            case 0:
                totalWeight += parseInt(content) || 0;
                dataEntry.weight = parseInt(content) || 0;
                i++;
                break;
            case 1:
                dataEntry.mark = parseFloat(content.replace(",", "."));
                i++;
                break;
            default:
                dataEntry.mark < 5.0 &&
                    dataEntry.weight > 0 &&
                    data.push(dataEntry);
                i = 0;
                dataEntry = new Object();
        }

        part.classList.add("ivprocessed");
    }

    let average = 0;
    console.info("Processed data:");
    console.table(data);

    // Calculate each grade with respect to total grade (arithmetic mean)
    data.forEach((ele) => {
        average += (ele.weight / totalWeight) * ele.mark;
    });

    console.info("Results:");
    console.info("Total ECTS: " + totalWeight);
    console.info("Average: " + average);

    let tableElement = tableEl[1];
    let infoDiv = document.createElement("div");

    // Workaround to not inherit table formatting
    tableElement.parentNode.insertBefore(infoDiv, tableElement.nextSibling);
    infoDiv.className = "ivinfoWrapper";

    appendText("Average Grade: " + average.toFixed(2), infoDiv);
    appendText("Total ECTS: " + totalWeight, infoDiv);
};

main();
