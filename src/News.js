import React from 'react';
import CookieService from './CookieService';

const API_KEY   = 'e33236504baa4c7db86719a4846bb682';
const BASE_URL  = 'https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey='
                + API_KEY + "&q=";
const MAIN_CATEGORY = "mainNewsCategory";
const cookieService = new CookieService();

class News extends React.Component { 
    constructor() {
        super();
        this.state  = {
          apiKey : API_KEY,
          articles : [],
          defaultCategory: 'all'
        };

        // Register functions of the class.
        this.getNews = this.getNews.bind(this);
        cookieService.setCookie = cookieService.setCookie.bind(this);
        cookieService.getCookie = cookieService.getCookie.bind(this);

        this.handleSearch = this.handleSearch.bind(this);
        this.search = this.search.bind(this);
    }

    // Called when constructor is finished building component.
    componentDidMount() {
        // Set main category from cookie if it does not exist.
        let mainCategory = cookieService.getCookie(MAIN_CATEGORY);
        if(mainCategory === null || mainCategory.trim() === '') {
            cookieService.setCookie(MAIN_CATEGORY, this.state.defaultCategory);
            mainCategory = this.state.defaultCategory;
        }
        this.getNews(mainCategory);
    }

    getNews(category) {    
        const URL        = BASE_URL + category;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                this.setState({articles:data.articles});
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);
            });         
    }

    handleSearch(e){
      if(e.target.value.trim() !== ''){
        this.setState({defaultCategory: e.target.value});
      }else{
        this.setState({defaultCategory: 'all'});
      }
    }

    search(){
      cookieService.setCookie(MAIN_CATEGORY, this.state.defaultCategory);
      this.getNews(this.state.defaultCategory);
    }

    render() {
        return (          
            <div>
                <div className='search-bar'>
                    <input type="text" onChange={this.handleSearch}></input>
                    <button onClick={this.search}>Search</button>
                </div>
                
                <ul>
                {this.state.articles.map((article, index) => (
                    <li key={index}>
                        {/* See  https://newsapi.org/ for more properties */}
                        <img src={article.urlToImage}></img>
                        <h2 className='article-title'>{article.title}</h2>
                        <p className='published-at'>{article.publishedAt}</p>
                        <p className='article-description'>{article.description}</p>
                        <a href={article.url} className='article-url'>Read More...</a>
                    </li>
                ))}  
                </ul>
            </div>     
        )
    }
}
export default News;
