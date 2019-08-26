import React from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import CookieService from './CookieService';
import './App.css';

const API_KEY   = 'e33236504baa4c7db86719a4846bb682';
const BASE_URL  = 'https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey='
                + API_KEY + "&q=";
const MAIN_CATEGORY = "mainNewsCategory";
const cookieService = new CookieService();

class App extends React.Component { 
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
        console.log(mainCategory);
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
                <Header/>
                <Footer />
            </div>     
        )
    }
}
export default App;
