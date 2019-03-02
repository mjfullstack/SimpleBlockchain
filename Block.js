/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
  constructor(data) { // NOTE: ONLY passing in data... no hash etc.
    this.hash = ""; // hashIn;
    this.height = 0; // heightIn;
    this.body = data; // []; // bodyIn;
    this.time = 0; // timeIn;
    this.previousBlockHash = ""; // prevHashIn;
  }
}

module.exports.Block = Block;