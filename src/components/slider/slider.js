import flickr from 'services/flickr/flickr';

import Pagination from 'components/pagination/pagination';
import Tooltip from 'components/tooltip/tooltip';

function renderLargeImage(photo, selected) {
    return photo.length !== 0 ? <img className="c-slider__slide--large-photo" src={flickr.getPhotoUrl(photo[selected])} /> : '';
}

export default (props) => {
    const {
        photo,
        page,
        pages,
        selected,
        params = {}
    } = props;

    return (
        <div className="c-slider">
            <div className="c-slider__slide">
                { renderLargeImage(photo, selected) }
                <button
                    className="c-slider__arrow c-slider__arrow--left"
                    onClick={() => props.onSelectImage(selected - 1)}
                    disabled={page === 1 && selected === 0}
                >
                    <span className="u-visually-hidden">Previous photo</span>
                </button>
                <button
                    className="c-slider__arrow c-slider__arrow--right"
                    onClick={() => props.onSelectImage(selected + 1)}
                    disabled={page === pages && selected === params.per_page}
                >
                    <span className="u-visually-hidden">Next photo</span>
                </button>
            </div>
            <nav className="u-text-align--right">
                <Tooltip
                    onToggle={props.onToogleTooltip}
                    buttonText="Share"
                    open={props.tooltipOpen}
                >
                    <img width="200" src="https://blog.po.st/wp-content/uploads/2013/11/Custom-Buttons-Circle.png" alt=""/>
                </Tooltip>
            </nav>
            <ul className="u-align--container-grid">{photo.map((photo, i) => {
                return <li className="c-slider__thumbnail" key={photo.id}>
                    <img
                        onClick={() => props.onSelectImage(i)}
                        className={`c-slider__photo${ selected === i ? ' c-slider__photo--selected' : '' }`}
                        src={flickr.getThumbUrl(photo)}
                    />
                </li>
            })}</ul>
            <Pagination
                onPageChanged={props.paginationOnPageChange}
                offset={props.paginationOffset}
                pages={pages}
                page={page}
            />
        </div>
    );
};
