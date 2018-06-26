///importing marketplace contract
var Marketplace = artifacts.require("./Marketplace.sol");

///start the contract testing
contract("Marketplace", function(accounts) {      //accounts is to provide gas
    
    var articlename ="test_article";
    var articleDescription = "this is a test";
    var articlePrice = web3.toWei(10, "ether");

    ///here start first test
    it("it should have a article counter is zero in the beginning", function() {
        // get instance of the contract
        return Marketplace.deployed().then(function(instance) {
            //call getNumberOfArticles function
            return instance.getNumberOfArticles();
        //pass on return value of getNumberOfArticles function    
        }).then(function(articleNumber){
            //check condition
            assert.equal(articleNumber, 0, "initial number not equal to zero")
        })
    })

    it("should have one article for sale", function() {
        var MarketplaceInstance;
        return Marketplace.deployed().then(function(instance) {
            MarketplaceInstance = instance;
            return MarketplaceInstance.sellArticle(
                articlename,
                articleDescription,
                articlePrice,
                {'from': accounts[0]} ///if function is not a view function, it must know where to get the gas
            )
        }).then(function() {
            return MarketplaceInstance.getNumberOfArticles(); //get number of articles
        }).then(function(articleCounter) {
            //check counter has increased
            assert.equal(articleCounter, 1, "articleCounter has not increased") //test whether number of articles 1
        }).then(function() {
            return MarketplaceInstance.articles(1)
        }).then(function(article) {  //test whether variables in article struct are correct values
            assert.equal(article[0], 1, "id is not 1");
            assert.equal(article[1], articlePrice, "price is not 10 ether");
            assert.equal(article[2], accounts[0], "seller is not correct");
            assert.equal(article[3], 0x0, "buyer is not unknown");
            assert.equal(article[4], articlename, "articleName is not correct");
            assert.equal(article[5], articleDescription, "articleDescription is not correct");
        })
    })
})