import paginationService from 'services/pagination/pagination';

const defaultOffset = 2;
const firstPage = 1;

export default (props) => {
    let { offset, pages, page, onPageChanged } = props;
    offset = offset || defaultOffset;

    const pagesList = paginationService.getRange(page, pages, offset);

    return (
        <nav className="c-pagination">
            <ol>
                <li className="c-pagination__item">
                    <button
                        disabled={page === firstPage}
                        className="c-pagination__button"
                        onClick={() => onPageChanged(firstPage)}
                    >&lt;&lt;</button>
                </li>
                <li className="c-pagination__item">
                    <button
                        disabled={page === firstPage}
                        className="c-pagination__button"
                        onClick={() => onPageChanged(page - 1)}
                    >&lt;</button>
                </li>
                {
                    pagesList.map((item, i) => {
                        return <li className="c-pagination__item" key={i}>
                            <button
                                disabled={item === '...'}
                                className={`c-pagination__button${item === page ? ' c-pagination__button--current' : ''}`}
                                onClick={() => onPageChanged(item)}
                            >{ item }</button>
                        </li>
                    })
                }
                <li className="c-pagination__item">
                    <button
                        disabled={page === pages}
                        className="c-pagination__button"
                        onClick={() => onPageChanged(page + 1)}
                    >&gt;</button>
                </li>
                <li className="c-pagination__item">
                    <button
                        disabled={page === pages}
                        className="c-pagination__button"
                        onClick={() => onPageChanged(pages)}
                    >&gt;&gt;</button>
                </li>
            </ol>
        </nav>
    );
};
