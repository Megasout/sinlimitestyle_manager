type TitleWithSearchType = {
    title: string,
    filter: string,
    placeHolder?: string
    onChange: (value: string) => void
}

function TitleWithSearch(props: TitleWithSearchType) {
    const {title, filter, onChange} = props

    const placeHolder = props.placeHolder ? props.placeHolder : 'Buscar...'

    return (
        <div className='titleWidthSearch'>
            <h1>{title}</h1>
            <div className='search'>
                <input
                    type='text'
                    placeholder={placeHolder}
                    value={filter}
                    onChange={(e) => onChange(e.target.value)} />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}

export default TitleWithSearch