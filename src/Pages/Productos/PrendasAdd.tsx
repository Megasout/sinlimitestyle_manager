function PrendasAdd() {
    return (
        <div className="prendas_add">
            <div className="titleWidthSearch">
                <h1>Agregar Prenda</h1>
            </div>
            <div className="content">
                <form className="data">
                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre de la prenda..."
                    />
                    <label>Categoria</label>
                    <select>
                        <option>---Sin Seleccionar---</option>
                    </select>
                    <label>Material</label>
                    <input
                        type="text"
                        placeholder="Materiales..." />
                    <label>Stock</label>
                    <input
                        type="number"
                        placeholder="Cantidad en stock" />
                    <label>Precio</label>
                    <input
                        type="number"
                        placeholder="Precio completo" />
                    <label>Descuento</label>
                    <input
                        type="number"
                        placeholder="Descuento %" />
                    <button className="buttonB">Seleccionar Talles</button>
                    <button className="buttonC">Seleccionar Colores</button>
                </form>
                <div className="images">
                    <div className="add">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        <h2>Arrastre y suelte sus archivos aquí</h2>
                        <p>O</p>
                        <h3>Buscar archivos</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrendasAdd