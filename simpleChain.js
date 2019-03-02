/* ===== Executable Test ==================================
|  Use this file to test your project.
|  =========================================================*/

const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');

// Instantiate the blockchain...
let myBlockChain = new BlockChain.Blockchain();

// Create WATCHDOG Timer...
console.log("Start WATCHDOG timer for whole test to prevent infinite wait...");
setTimeout(function () {  // Prints at the END of the run (12 Sec) when...
	console.log("\nWATCHDOG timer DONE Waiting... test is ending"); 
}, 13000);								// theLoop timeout is 1 sec


/*****************************************
 ***  Function to Create Test Blocks   ***
 *****************************************/
(function theLoop (i) {
	setTimeout(function () {
		let blockTest = new Block.Block("Test Block, i = " + (i + 1));
			// For this call, keep track of block height as blocks they are generated
			myBlockChain.getBlockHeight().then((height) => {
				console.log(`\nSimpleChain: 'theLoop' height = ${height}`);
			}).catch((err) => { console.log(`\nSimpleChain: 'theLoop' getBlockHeight: Saw error ${err}`)});

			// Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
		myBlockChain.addBlock(blockTest).then((result) => {
			console.log("SimpleChain: Generate Blocks in self-calling function 'theLoop': \n", result);
			i++;
			if (i < 10) theLoop(i);
		});
	}, 1000);
  })(0);


/******************************************************
 *****   Function to get the Height of the Chain   ****
 ******************************************************/
// For this call, assuming the intent is to wait until the loop generating
// blocks has completed.
console.log("Start waiting to run getBlockHeight AFTER all blocks are generated...");
setTimeout(function () {  // Prints at the END of the run (11.5 Sec) when
	console.log("\nDone Waiting... Now run getBlockHeight...") // loop timeout is 1 sec
	// Be careful this only will work if `getBlockHeight` method in Blockchain.js file returns a Promise
	myBlockChain.getBlockHeight().then((height) => {
		console.log(`SimpleChain: height = ${height}`);
	})
	.catch((err) => { console.log(`SimpleChain getBlockHeight: Saw error ${err}`)
	})
	// }, 11500);	// Ending here was successful. Now include getBlock to occur 
								// AFTER the wait as well.

	.then(() => {
		/***********************************************
		 *****    Function to Get a Block    ***********
		***********************************************/
		// Be careful this only will work if `getBlock` method in Blockchain.js file return a Promise
		myBlockChain.getBlock(0).then((block) => {
			// console.log(`myBlockChain.getBlock 0 \n`, JSON.stringify(block));
			console.log(`\nmyBlockChain.getBlock 0 \n`, block);
		})
		.then( () => {
			myBlockChain.getBlock(4).then((block) => {
				console.log(`\nmyBlockChain.getBlock 4 \n`, block);
			})
		})
		.then( () => {
			myBlockChain.getBlock(5).then((block) => {
				console.log(`\nmyBlockChain.getBlock 5 \n`, block);
			})
		})
		.then( () => {
			myBlockChain.getBlock(7).then((block) => {
				console.log(`\nmyBlockChain.getBlock 7 \n`, block, `\n`);
			})
		})
		.catch((err) => { console.log(`myBlockChain.getBlock: Saw error ${err}`)
		})
		// }, 11500);	// Ending here was successful. Now include validateBlock to occur 
									// AFTER the wait as well.

			.then(() => {
				/***********************************************
				 ***************** Validate Block  *************
				***********************************************/
				// Be careful this only will work if `validateBlock` method in Blockchain.js file return a Promise
				myBlockChain.validateBlock(0).then((valid ) => {
					console.log(`myBlockChain.validateBlock 0: valid = ${valid}`);
				})
				.catch((error) => { console.log(`myBlockChain.validateBlock: Saw error ${error}`)
				})
				// })
				// }, 11500);	// Ending here was successful. Now include validateChain to occur 
											// AFTER the wait as well.

				.then(() => {
					/***********************************************
					/** Tampering a Block this is only for the purpose of testing the validation methods */
					/***********************************************/
					myBlockChain.getBlock(5).then((block) => {
						let blockAux = block;
						blockAux.body = "Tampered Block";
						myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
							if(blockModified){
								myBlockChain.validateBlock(blockAux.height).then((valid) => {
									console.log(`Block #${blockAux.height}, is valid? = ${valid}`);
								})
								.catch((error) => {
									console.log(error);
								})
							} else {
								console.log("The Block wasn't modified");
							}
						}).catch((err) => { console.log(err);});
					}).catch((err) => { console.log(err);});

					myBlockChain.getBlock(6).then((block) => {
						let blockAux = block;
						blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
						myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
							if(blockModified){
								console.log("The Block was modified");
							} else {
								console.log("The Block wasn't modified");
							}
						}).catch((err) => { console.log(err);});
					}).catch((err) => { console.log(err);});

				})
				.then(() => {
					/***********************************************
					 ***************** Validate Chain  *************
					***********************************************/ 
					// Be careful this only will work if `validateChain` method in Blockchain.js file returns a Promise
					myBlockChain.validateChain().then((errorLog) => {
						if(errorLog.length > 0){
							console.log("\nThe chain is not valid:");
							errorLog.forEach(error => {
								console.log(`simpleChain.valChain Error: ${error}`);
							});
						} else {
							console.log("No errors found, The chain is Valid!");
						}
					})
					.catch((error) => {
						console.log(error);
					})
			})
		})
	})
}, 11500);									


