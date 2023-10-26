import { React, useContext, useEffect, useState } from "react";
import TablaCategoria from "./TablaCategoria";

export default function CategoriaBody() {
  const columns = ["Id", "Nombre", "Estado", "Competencia", "Editar"];
  

  return (
    <>
        <TablaCategoria
          columns={columns}
          path={"/formularioCategoria"}
          msg={"Agregar Categoria"}
          showButton={true}
        />
    </>
  );
}
