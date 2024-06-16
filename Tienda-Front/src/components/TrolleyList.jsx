import useQuisco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";
export default function TrolleyList({product}) {

    const {handleEditarCantidad, handleEliminarProductoPedido} = useQuisco();
    const {id, name, price, quantity} = product
    const baseURL = 'http://localhost'; 

    return (
        <div  className=" p-2">

          <div className="flex justify-between items-center">
            <div className="flex items-center ">
              <span className="text-lg font-bold">*</span>
              <p className="text-xl font-bold">{name}</p>
            </div>
            <div className="price-column">
              <p className="text-lg font-bold">{formatearDinero(price)}</p>
            </div>
          </div>
        </div>
      );
    }