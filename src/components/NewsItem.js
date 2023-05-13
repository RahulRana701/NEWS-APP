import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    // this is how we make props in class
    let { title, discription, imageurl, newsurl, author, date } = this.props;
    return (
      <div>
        <div className="card" style={{ width: '18rem' }}>
          <img src={imageurl} className="card-img-top" height={'180px'} width={'100px'} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{discription}...</p>
            <p class="card-text"><small class="text-body-secondary">By {author ? 'unknown' : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target='_blank' className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
