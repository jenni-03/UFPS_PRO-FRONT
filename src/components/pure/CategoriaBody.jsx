import { React, useContext, useEffect, useState } from "react";
import TablaCategoria from "./TablaCategoria";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from "react-hot-toast";

export default function CategoriaBody() {
  const { token } = useContext(AppContext);
  const columns = ["Id", "Nombre", "Estado", "Competencia", "Editar"];
  const [categorias, setCategorias] = useState();
  const obtenerCategorias = async () => {
    let response = await axiosApi
      .get("api/categoria", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
    setCategorias(response.data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <>
      {categorias ? (
        <TablaCategoria
          columns={columns}
          items={categorias}
          path={"/formularioCategoria"}
          msg={"Agregar Categoria"}
          showButton={true}
        />
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
}
