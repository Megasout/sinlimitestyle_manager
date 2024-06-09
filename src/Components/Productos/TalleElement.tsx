import { useNavigate } from "react-router-dom"

type TalleType = {
    idCategoria: number,
    categoria: string,
    talles: Array<any>
}

function TalleElement(props: TalleType) {
    const {categoria, idCategoria, talles} = props
    const navigator = useNavigate()

    const handleClick = () =>{
        navigator(`../Talles/${idCategoria}/edit`)
    }

    return (
        <tr className="item">
            <td>
                <p>{categoria}</p>
            </td>
            <td>
                <p>{showTalles(talles)}</p>
            </td>
            <td className="actions">
                <form
                    method="POST">
                    <button
                        className="add blue"
                        onClick={handleClick}
                        type="button">Editar Talles</button>
                </form>
            </td>
        </tr>
    )
}

function showTalles(values: Array<any>): string{
    let talles: string = ''

    for (let i = 0; i < values.length; i++){
        talles += values[i].talle
        
        if (i < values.length - 1)
            talles += ', ' 
    }  

    return talles
}

export default TalleElement