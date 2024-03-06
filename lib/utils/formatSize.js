export default function formatSize(size, isShort) {
  let sizeData = null;

  if (Number.isInteger(parseInt(size))) {

    size=parseInt(size);
    console.log("(size)", size);

    switch(size) {
      case 0:
        // code block
        sizeData = isShort ? "XL" : "Extra Large";

        break;
      case 1:
        // code block
        sizeData = isShort ? "L" : "Large";

        break;

      case 2:
        // code block
        sizeData = isShort ? "M" : "Medium";

        break;

      case 3:
        // code block
        sizeData = isShort ? "S" : "Small";

        break;
      case 4:
          // code block
          sizeData = isShort ? "NA" : "None";
          break;

      default:
        sizeData = size;
    }

  } else {
    size = size?.trim()?.toLowerCase()?.replace(/"/g, '');
    console.log("(size)", size);

    switch(size) {
      case "extra large" :
        // code block
        sizeData = isShort ? "XL" : "Extra Large";

        break;
      case "large":
        // code block
        sizeData = isShort ? "L" : "Large";

        break;

      case "medium":
        // code block
        sizeData = isShort ? "M" : "Medium";

        break;

      case "small":
        // code block
        sizeData = isShort ? "S" : "Small";
        break;
      
      case "none":
          // code block
          sizeData = isShort ? "NA" : "None";
        break;
        default:
        sizeData = size?.slice(3, 6);;
    }

  }


  return sizeData ? sizeData : "NA";
}
