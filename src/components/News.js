import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export default class News extends Component {
  //  we stores api articles in this variable  as we want to use it in state, we have to keep on changing these
  // that's why we put it in states
  // we will fetch api not use it like this
  // articles = [
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]

  // we will add some default props and proptypes.

  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }



  constructor() {
    // whenever you use a constructor always use super();
    super();
    this.state = {
      // we are making it empty because we have to put fetched api in it
      articles: [],
      loading: false,
      page: 1
    }
  }


  async componentDidMount(props) {
    this.props.setProgress(0);
    // this is url to fetch api, fetch api takes a url and returns a promise, await means ki wait krega api ke fetch
    // hone ka , ya promise resolve hone ka tbhi aage jayega
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&${this.props.apikey}&page=1&pageSize=6`;
    let data = await fetch(url);
    //  this will give parsed fetch api
    let parsedData = await data.json();
    //  we used articles like this here
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
// when everything is done make progress 100, so full line
    this.props.setProgress(100);
  }
  handleprev = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&${this.props.apikey}&page=${this.state.page - 1}&pageSize=6`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }
  handlenext = async () => {

    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 6)) {
      // we do nothing if greater than this.
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&${this.props.apikey}&page=${this.state.page + 1}&pageSize=6`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }



  render() {
    return (
      <div className='container my-3'>
        {/* now newsitem is a component of news component */}
        {/* one change in newsitem component and it will change for all this is the benefit */}
        <h2 className='my-5 text-center'>TOP HEADLINES</h2>
        {/* now we can pass props here and values will fetch from it automatically. */}
        {/* this is grid system of bootstrap */}
        <div className="row">
          {/* this will give our articles. */}
          {/* here unique key will be the url of the news */}
          {this.state.articles.map((element) => {
            return <div className="col md-6 d-flex justify-content-center my-3" key={element.url}>
              {/* we are slicing some text to make containers of equal size */}
              <NewsItem title={element.title ? element.title.slice(0, 60) : ""} discription={element.description ? element.description.slice(0, 60) : ""} imageurl={element.urlToImage}
                newsurl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-3 ">
          {/* there are many aritcles but we can have only few, other are on next page of api */}
          {/* disabled because we dont't want to go back when page is less than one */}
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprev}>Prev</button>
          <button type="button" className="btn btn-dark" onClick={this.handlenext}>Next</button>
        </div>
      </div>
    )
  }
}

// page size sets the size , means ki itne articles aane chahiye ek page pe, we use it to check ki hamara last page
// konsa hai