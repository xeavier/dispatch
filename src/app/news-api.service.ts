import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
// import {Observable} from 'rxjs/Rx';
 import 'rxjs/add/operator/map';

@Injectable()
export class NewsApiService {

  public bingToken: string;
  public bbc: any;
  public bingWorld: any;
  public bingPolitics: any;
  public apNews: any;
  public googleNews: any;
  public economistNews: any;
  public nytNews: any;
  public wapoNews: any;
  public cnnNews: any;
  public newsweekNews: any;
  public reutersNews: any;
  public guardianUkNews: any;
  public guardianAuNews: any;
  public huffPostNews: any;
  public wsjNews: any;

  public eventRegistryBBC: any;
  public eventRegistryGuardian: any;
  public eventRegistryCNN: any;
  public eventRegistryWAPO: any;
  public eventRegistryReuters: any;
  public eventRegistryNYT: any;
  public eventRegistryEconomist: any;
  public eventRegistryAP: any;
  public eventRegistryWSJ: any;
  public eventRegistryNewswire: any;

  constructor(
    private http: Http,
    private router: Router
  ) {

    // Set Token Variable
      this.bingToken = "3393050cb6564841a62d58f60b8f4ccb";
      if (this.bingToken != null) {
        console.log("API token works");
      } else {
        alert("API token not working");
      }

   }


//EVENT REGISTRY

//BBC
getEventRegistryBBC(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=bbc.co.uk&sourceUri=bbc.com&categoryUri=dmoz%2FSociety%2FPolitics&action=getArticles&articlesSortBy=date&resultType=articles&articlesCount=200&articlesIncludeArticleDuplicateList=true&articlesIncludeArticleCategories=true&articlesIncludeConceptImage=true&articlesIncludeConceptDescription=true&articlesIncludeConceptDetails=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
    .map((res) => {
      this.eventRegistryBBC = res.json()
      return res.json().articles.results;
    })
}

//PR NEWSWIRE
getEventRegistryNewswire(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=prnewswire.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesCount=20&articlesIncludeArticleConcepts=true&articlesIncludeArticleCategories=true&articlesIncludeArticleImage=true&articlesIncludeConceptSynonyms=true&articlesIncludeConceptImage=true&articlesIncludeConceptDescription=true&articlesIncludeConceptDetails=true&articlesIncludeSourceDescription=true&articlesIncludeSourceLocation=true&articlesIncludeSourceDetails=true&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
    .map((res) => {
      this.eventRegistryNewswire = res.json()
      return res.json().articles.results;
    })
}



//Guardian
getEventRegistryGuardian(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=www.theguardian.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesIncludeArticleLocation=true&articlesCount=200&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&articlesIncludeSourceLocation=true&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryGuardian = res.json()
    return res.json().articles.results;
  })
}

// &articlesCount=200

//CNN
getEventRegistryCNN(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=edition.cnn.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesIncludeArticleLocation=true&&articlesCount=200&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&articlesIncludeSourceLocation=true&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryCNN = res.json()
    return res.json().articles.results;
  })
}


//Washington Post
getEventRegistryWAPO(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=www.washingtonpost.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=rel&resultType=articles&articlesIncludeArticleLocation=true&articlesCount=200&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeConceptDescription=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&articlesIncludeSourceLocation=true&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryWAPO = res.json()
    return res.json().articles.results;
  })
}

//Reuters
getEventRegistryReuters(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=reuters.com&categoryUri=dmoz%2FSociety%2FPolitics&action=getArticles&articlesIncludeArticleImage=true&articlesSortBy=date&resultType=articles&articlesCount=200&articlesIncludeArticleDuplicateList=true&articlesIncludeArticleCategories=true&articlesIncludeConceptImage=true&articlesIncludeConceptDescription=true&articlesIncludeConceptDetails=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeSourceDetails=true&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryReuters = res.json()
    return res.json().articles.results;
  })
}




//New York Times
getEventRegistryNYT(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=www.nytimes.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesIncludeArticleLocation=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeSourceLocation=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&articlesCount=200&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryNYT = res.json()
    return res.json().articles.results;
  })
}

//Economist
getEventRegistryEconomist(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=www.economist.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesIncludeArticleLocation=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeSourceLocation=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&articlesCount=200&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryEconomist = res.json()
    return res.json().articles.results;
  })
}

//Associated Press
getEventRegistryAP(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=hosted.ap.org&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesIncludeArticleLocation=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeSourceLocation=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&articlesCount=200&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryAP = res.json()
    return res.json().articles.results;
  })
}

getEventRegistryWSJ(){
  return this.http.get("http://eventregistry.org/json/article?sourceUri=www.wsj.com&categoryUri=dmoz%2FSociety%2FPolitics&lang=eng&action=getArticles&articlesSortBy=date&resultType=articles&articlesIncludeArticleLocation=true&articlesIncludeConceptTrendingScore=true&articlesIncludeSourceDescription=true&articlesIncludeSourceLocation=true&articlesIncludeArticleImage=true&articlesIncludeSourceDetails=true&articlesCount=200&apiKey=3c5819e5-c21f-4374-8977-d1c9cdcc9048")
  .map((res) => {
    this.eventRegistryWSJ= res.json()
    return res.json().articles.results;
  })
}




getBBC(){
  return this.http.get('https://newsapi.org/v1/articles?source=bbc-news&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.bbc = res.json()
      return res.json();
    })
}

getAlJazeera(){
  return this.http.get('https://newsapi.org/v1/articles?source=al-jazeera-english&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.bbc = res.json()
      return res.json();
    })
}

getAP(){
  return this.http.get('https://newsapi.org/v1/articles?source=associated-press&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.apNews = res.json()
      return res.json();
    })
}

getGoogle(){
  return this.http.get('https://newsapi.org/v1/articles?source=google-news&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.googleNews = res.json()
      return res.json();
    })
}

getEconomist(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-economist&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.economistNews = res.json()
      return res.json();
    })
}

getNYT(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-new-york-times&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.nytNews = res.json()
      return res.json();
    })
}

getWAPO(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-washington-post&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.wapoNews = res.json()
      return res.json();
    })
}

getCNN(){
  return this.http.get('https://newsapi.org/v1/articles?source=cnn&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.cnnNews = res.json()
      return res.json();
    })
}

getNEWSWEEK(){
  return this.http.get('https://newsapi.org/v1/articles?source=newsweek&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.newsweekNews = res.json()
      return res.json();
    })
}

getREUTERS(){
  return this.http.get('https://newsapi.org/v1/articles?source=reuters&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.reutersNews = res.json()
      return res.json();
    })
}

getGuardianUK(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-guardian-uk&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.guardianUkNews = res.json()
      return res.json();
    })
}

getGuardianAU(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-guardian-au&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.guardianAuNews = res.json()
      return res.json();
    })
}

getHuffPost(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-huffington-post&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.huffPostNews = res.json()
      return res.json();
    })
}

getWSJ(){
  return this.http.get('https://newsapi.org/v1/articles?source=the-wall-street-journal&apiKey=dd5bd57f45cc49fb91999189ffcf95fd')
      .map((res) => {
      this.wsjNews = res.json()
      return res.json();
    })
}


getBingWorldNews() {
  let headers = new Headers({ 'Ocp-Apim-Subscription-Key': this.bingToken });
  let options = new RequestOptions({ headers: headers });
    return this.http.get(`https://api.cognitive.microsoft.com/bing/v5.0/news/?Category=World&count=100`, options)
      .map((res) => {
        this.bingWorld = res.json()
        return res.json();
      })
}

getBingPoliticsNews() {
  let headers = new Headers({ 'Ocp-Apim-Subscription-Key': this.bingToken });
  let options = new RequestOptions({ headers: headers });
    return this.http.get(`https://api.cognitive.microsoft.com/bing/v5.0/news/?Category=Politics&count=100`, options)
      .map((res) => {
        this.bingPolitics = res.json()
        return res.json();
      })
}







}
