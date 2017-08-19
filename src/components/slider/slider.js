import React from "react"
import flickr from 'services/flickr/flickr';
import Pagination from '../pagination/pagination';
import Tooltip from '../tooltip/tooltip';
import PhotoFrame from './sliderComponents/photoFrame';

function renderLargeImage ( photo, selected ) {
  return photo.length !== 0 ?
    <PhotoFrame _currentPhotoUrl={ flickr.getPhotoUrl(photo[ selected ]) }/> : '';
}


class Slider extends React.Component {
  constructor ( props ) {
    super(props);
    this.state = {}
  }

  componentWillMount () {
    const { photo, page, pages, selected, params = {} } = this.props;
    return this.setState({
      photo,
      page,
      pages,
      selected,
      params,
    })
  }


  render () {
    const imageList = this.photo.map(( photo, index ) => {
      return (
        <li className="c-slider__thumbnail" key={ photo.id }>
          <PhotoFrame 
           _classname={ `c-slider__photo${ this.state.selected === index ? ' c-slider__photo--selected' : '' }`}     
           _currentPhotoUrl={flickr.getThumbUrl(this.state.photo[ this.state.selected ])}
           _onClick={this.props.onSelectImage(index)}
          />
          <img
            onClick={ () => this.props.onSelectImage(index) }
            className={ `c-slider__photo${ this.state.selected === index ? ' c-slider__photo--selected' : '' }` }
            src={ flickr.getThumbUrl(photo) }
          />
        </li>
      )
    })
    return (
      <div className="c-slider">
        <div className="c-slider__slide">
          {
            this.state.photo.length > 0 &&
            <PhotoFrame
              _classname="c-slider__slide--large-photo"
              _currentPhotoUrl={ flickr.getPhotoUrl(this.state.photo[ this.state.selected ]) }/>
          }
          <button
            className="c-slider__arrow c-slider__arrow--left"
            onClick={ () => this.props.onSelectImage(this.state.selected - 1) }
            disabled={ this.state.page === 1 && this.state.selected === 0 }
          >
            <span className="u-visually-hidden">Previous photo</span>
          </button>
          <button
            className="c-slider__arrow c-slider__arrow--right"
            onClick={ () => this.props.onSelectImage(this.state.selected + 1) }
            disabled={ this.state.page === this.state.pages && this.state.selected === this.state.params.per_page }
          >
            <span className="u-visually-hidden">Next photo</span>
          </button>
        </div>
        <nav className="u-text-align--right">
          <Tooltip
            onToggle={ this.props.onToogleTooltip }
            buttonText="Share"
            open={ this.props.tooltipOpen }
          >
            <img width="200" src="https://blog.po.st/wp-content/uploads/2013/11/Custom-Buttons-Circle.png" alt=""/>
          </Tooltip>
        </nav>
        <ul className="u-align--container-grid">{ this.state.photo.map(( photo, index ) => {
          return <li className="c-slider__thumbnail" key={ photo.id }>
            <img
              onClick={ () => this.props.onSelectImage(index) }
              className={ `c-slider__photo${ this.state.selected === index ? ' c-slider__photo--selected' : '' }` }
              src={ flickr.getThumbUrl(photo) }
            />
          </li>
        }) }</ul>
        <Pagination
          onPageChanged={ this.props.paginationOnPageChange }
          offset={ this.props.paginationOffset }
          pages={ this.state.pages }
          page={ this.state.page }
        />
      </div>
    );
  }

}

/*
const Slider = ( props ) => {


  return (
    <div className="c-slider">
      <div className="c-slider__slide">
        { renderLargeImage(photo, selected) }
        <button
          className="c-slider__arrow c-slider__arrow--left"
          onClick={ () => props.onSelectImage(selected - 1) }
          disabled={ page === 1 && selected === 0 }
        >
          <span className="u-visually-hidden">Previous photo</span>
        </button>
        <button
          className="c-slider__arrow c-slider__arrow--right"
          onClick={ () => props.onSelectImage(selected + 1) }
          disabled={ page === pages && selected === params.per_page }
        >
          <span className="u-visually-hidden">Next photo</span>
        </button>
      </div>
      <nav className="u-text-align--right">
        <Tooltip
          onToggle={ props.onToogleTooltip }
          buttonText="Share"
          open={ props.tooltipOpen }
        >
          <img width="200" src="https://blog.po.st/wp-content/uploads/2013/11/Custom-Buttons-Circle.png" alt=""/>
        </Tooltip>
      </nav>
      <ul className="u-align--container-grid">{ photo.map(( photo, index ) => {
        return <li className="c-slider__thumbnail" key={ photo.id }>
          <img
            onClick={ () => props.onSelectImage(index) }
            className={ `c-slider__photo${ selected === index ? ' c-slider__photo--selected' : '' }` }
            src={ flickr.getThumbUrl(photo) }
          />
        </li>
      }) }</ul>
      <Pagination
        onPageChanged={ props.paginationOnPageChange }
        offset={ props.paginationOffset }
        pages={ pages }
        page={ page }
      />
    </div>
  );
};
*/

export default Slider;
