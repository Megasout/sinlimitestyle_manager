type TableLinesType = {
    lines: number
}

function TableLines(props: TableLinesType) {
    const { lines } = props

    return (
        <tr>
            {Array.from({ length: lines }).map((_, index) =>
                <td key={index}>
                    <div className="line"></div>
                </td>
            )}
        </tr>
    )

}

export default TableLines