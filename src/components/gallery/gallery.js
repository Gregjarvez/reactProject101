import React, { PropTypes } from 'react';import flickr from '../../services/flickr/flickr';import Header from '../header/header';import Slider from '../slider/slider';class Gallery extends React.Component {  constructor ( props ) {    super(props);    this.state = {      photo: [],    }    this.flickrConfig = this.props.flickrConfig    this.defaultSearchTerm = this.props.flickrConfig.text;    this.onSearch = this.onSearch.bind(this);    this.getFlickrPhotos = this.getFlickrPhotos.bind(this);    this.selectChange = this.selectChange.bind(this)  }  componentDidMount () {    this.get(1)  }  getFlickrPhotos (configuration) {    return flickr.getPhotos(configuration)          .then(response => response.json())          .then(( { photos } ) => photos)  }  get ( page, searchParam ) {    const params = { text: searchParam || this.defaultSearchTerm, page }    const _configWithParams = Object.assign({}, this.flickrConfig, params);    this.getFlickrPhotos(_configWithParams)        .then(photos => {          return this.setState({            params  : _configWithParams,            page    : photos.page,            pages   : photos.pages,            photo   : photos.photo,            selected: 0          })        })  }  selectChange ( selected, state) {    const { params, page } = state;    const countPerPage = params.per_page;    let shouldFetchNextPage = selected >= countPerPage ? this.get(page + 1, this.state.params.text) : false;    return shouldFetchNextPage || this.setState({ selected })  }  onSearch ( searchParam , count = 1) {    return this.get(count, searchParam)  }  render () {    const { title, paginationOffset } = this.props;    const state = this.state    return (      <div>        <Header title={ title } _onSearch={ this.onSearch }/>        <Slider paginationOffset={ paginationOffset }                onSelectImage={ selected => this.selectChange(selected , state) }                paginationOnPageChange={ page => this.get(page, this.state.params.text) }                onToogleTooltip={ tooltipOpen => this.setState({ tooltipOpen: !state.tooltipOpen }) }                tooltipOpen={ state.tooltipOpen }                photo={this.state.photo}                { ...state }        />      </div>    )  }}export default Gallery;