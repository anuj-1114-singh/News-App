import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title ,description,imageUrl,newsUrl,author,date} = this.props;
    return (
     
      <div>
         <div className="">
         <div className="card" style={{width:"18 rem"}}>
  <img src={imageUrl?imageUrl:"https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-gc1n7rhh5k1elc61gkmgu4u0g4-20160624032054.Medi.jpeg"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} updated on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
  </div>
</div>
         </div>
      </div>
    )
  }
}

export default NewsItems