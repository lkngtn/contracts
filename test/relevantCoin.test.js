
const RelevantCoin = artifacts.require('../contracts/RelevantCoin.sol');

contract('RelevantCoin', function (accounts) {
  let instance;
  let decimals = 18;

  before(async () => {
    instance = await RelevantCoin.deployed();
  });

  async function getRequestParams(amount) {
    let supply = await instance.totalSupply.call();
    supply = supply.valueOf();

    let poolBalance = await instance.poolBalance.call();
    poolBalance = poolBalance.valueOf();

    let solRatio = await instance.reserveRatio.call();
    let reserveRatio = solRatio.toNumber() / 1000000;

    let price = poolBalance * ((1 + amount * (10 ** 18) / supply) ** (1 / (reserveRatio)) - 1);
    return {
      supply, poolBalance, solRatio, price
    };
  }


  // it('should put totalSupply of RelevantCoin in the first account', async function () {
  //   let balance = await instance.balanceOf.call(accounts[0]);
  //   let totalSupply = await instance.totalSupply();
  //   // console.log('balance ', balance.valueOf())
  //   assert.equal(balance.valueOf(), totalSupply.valueOf(), 'totalSupply_ wasn\'t in the first account');
  // });

  // it('should send coin correctly', async function() {
  //   const instance = await RelevantCoin.deployed()

  //   // Get initial balances of first and second account.
  //   const acc1 = accounts[0];
  //   const acc2 = accounts[1];

  //   const startBalanceAcc1 = await instance.balanceOf.call(acc1);
  //   const startBalanceAcc2 = await instance.balanceOf.call(acc2);

  //   const decimals = await instance.decimals();
  //   const amount = 10 * (10 ** decimals);

  //   const success = await instance.transfer(acc2, amount);
  //   // console.log('Successfull transfer ', success);

  //   const endBalanceAcc1 = await instance.balanceOf.call(acc1);
  //   const endBalanceAcc2 = await instance.balanceOf.call(acc2);

  //   assert.equal(endBalanceAcc1.toNumber(), startBalanceAcc1.toNumber() - amount, 'Amount wasn't correctly taken from the sender');
  //   assert.equal(endBalanceAcc2.toNumber(), startBalanceAcc2.toNumber() + amount, 'Amount wasn't correctly sent to the receiver');
  // });


  // it('should call a function that depends on a linked library', function () {
  //   let meta;
  //   let RelevantCoinBalance;
  //   let RelevantCoinEthBalance;

  //   return RelevantCoin.deployed().then(function (instance) {
  //     meta = instance;
  //     return meta.balanceOf.call(accounts[0]);
  //   }).then(function (outCoinBalance) {
  //     RelevantCoinBalance = outCoinBalance.toNumber();
  //     return meta.getBalanceInEth.call(accounts[0]);
  //   }).then(function (outCoinBalanceEth) {
  //     RelevantCoinEthBalance = outCoinBalanceEth.toNumber();
  //   }).then(function () {
  //     assert.equal(RelevantCoinEthBalance, 2 * RelevantCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  //   });
  // });
});

