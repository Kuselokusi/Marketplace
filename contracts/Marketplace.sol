pragma solidity ^0.4.19;

contract Marketplace {

  struct Article {

      uint id;
      address seller;
      address buyer;
      string name_of_article;
      string description_of_article;
      uint price;
  }
  
  event SellArticleEvent(address id, string seller, string name, uint price);

  mapping (uint => Article) articles;

  uint articleCounter = 0;
  
  function sellArticle(string name_of_article, string description_of_article, uint price) external {
    
    articleCounter++;
    articles[articleCounter] = Article(articleCounter , msg.sender, 0x0, name_of_article, description_of_article, price);
    SellArticleEvent(msg.sender, "0x0", name_of_article, price); 
  }

  function getNumberOfArticles() external view returns (uint) {
      return articleCounter;
  } 


}

