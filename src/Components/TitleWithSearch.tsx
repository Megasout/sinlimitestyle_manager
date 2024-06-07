type TitleWithSearchType = {
    title: string,
    filter: string,
    onChange: (value: string) => void
}

function TitleWithSearch(props: TitleWithSearchType) {
    const {title, filter, onChange} = props

    return (
        <div className='titleWidthSearch'>
            <h1>{title}</h1>
            <div className='search'>
                <input
                    type='text'
                    placeholder='Buscar...'
                    value={filter}
                    onChange={(e) => onChange(e.target.value)} />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}

export default TitleWithSearch