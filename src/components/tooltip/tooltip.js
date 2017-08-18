export default (props) => {

    return (
        <div className="c-tooltip">
            { props.open ? <div className="c-tooltip__content">{ props.children }</div> : <div></div> }
            <button
                className="c-tooltip__button"
                onClick={props.onToggle}
            >{ props.buttonText }</button>
        </div>
    );
};
