import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "science"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }
  constructor() {
    super();
    console.log("ka re");
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae9c26d2b11b465c8e881991fd926f1a&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    // this.setState({})
    this.setState({ articles: parseData.articles, totalResult: parseData.totalResults, loading: false });
    console.log(this.state.totalResult);
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae9c26d2b11b465c8e881991fd926f1a&page=${this.state.page - 1}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false
    });
  }

  handleNextClick = async () => {
    console.log(this.state.totalResult);
    if (this.state.page + 1 > Math.ceil(this.state.totalResult / 20)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae9c26d2b11b465c8e881991fd926f1a&page=${this.state.page + 1}&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
        loading: false
      });
      console.log(this.state.page + 1);
      console.log(this.state.articles);
    }

  }

  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center my-4">NewsMonkey-Top Headline</h1>
        <div className="text-center">
          {this.state.loading && <Spinner />}
        </div>
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItems title={element.title ? element.title.slice(0, 45) : "No Title"} description={element.description ? element.description.slice(0, 60) : "No Description"} imageUrl={element.urlToImage} newsUrl={element.url}
              author={element.author} date={element.publishedAt} />
            </div>
          })}

        </div>
        <div className="container d-flex justify-content-between my-5">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-md btn-dark" onClick={this.handlePrevClick}>&larr;Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / 20)} type="button" className="btn btn-md btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>

      </div>
    )
  }
}

export default News