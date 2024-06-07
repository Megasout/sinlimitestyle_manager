type LoaderProps = {
    loader: boolean
}

function Loader(props: LoaderProps) {
    const { loader } = props

    return (
        (loader) ?
            <div className="modal_loader">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div> :
            <div></div>
    )
}

export default Loader