import React, { useEffect, useContext } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import PrincipalPage from "../pages/Admin/principal/PrincipalPage";
import Competencias from "../pages/Admin/competencias/Competencias";
import ErrorPage from "../pages/404/ErrorPage";
import SideBar from "../components/SideBar";
import Pruebas from "../pages/Admin/pruebas/Pruebas";
import Categorias from "../pages/Admin/categorias/Categorias";
import Preguntas from "../pages/Admin/preguntas/Preguntas";
import Estudiantes from "../pages/Admin/estudiantes/Estudiantes";
import Convocatorias from "../pages/Admin/convocatorias/Convocatorias";
import AgregarCompetencia from "../pages/Admin/competencias/AgregarCompetencia";
import AgregarCategoria from "../pages/Admin/categorias/AgregarCategoria";
import SeleccionarTipoPregunta from "../pages/Admin/preguntas/SeleccionarTipoPregunta";
import PreguntaSimple from "../pages/Admin/preguntas/PreguntaSimple";
import AgregarPrueba from "../pages/Admin/pruebas/AgregarPrueba";
import CambiarContrasenia from "../pages/Admin/principal/CambiarContrasenia";
import PreguntaImagen from "../pages/Admin/preguntas/PreguntaImagen";
import CambiarImagen from "../pages/Admin/principal/CambiarImagen";
import EditarInformacion from "../pages/Admin/principal/EditarInformación";
import EditarCompetencia from "../pages/Admin/competencias/EditarCompetencia";
import EditarCategoria from "../pages/Admin/categorias/EditarCategoria";
import Login from "../pages/Inicios/Login";
import { AppContext } from "../components/context/AppProvider";
import { Toaster } from "react-hot-toast";
import EditarPregunta from "../pages/Admin/preguntas/EditarPregunta";
import EditarEstudiante from "../pages/Admin/estudiantes/EditarEstudiante";
import AgregarConvocatoria from "../pages/Admin/convocatorias/AgregarConvocatoria";
import EditarConvocatoria from "../pages/Admin/convocatorias/EditarConvocatoria";
import EmailRecuperación from "../components/forms/EmailRecuperacion";
import NewPassword from "../components/forms/NewPassword";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/container/Layout";
import PrincipalPageUser from "../pages/User/principal/PrincipalPageUser";
import EditarInfoUser from "../pages/User/principal/EditarInfoUser";
import ConvocatoriaUser from "../pages/User/convocatorias/ConvocatoriaUser";
import PruebasUser from "../pages/User/pruebas/PruebasUser";
import EditarPrueba from "../pages/Admin/pruebas/EditarPrueba";
import CambiarContraseniaEstudiante from "../pages/User/principal/CambiarContraseniaEstudiante";
import PresentarConvocatoria from "../pages/User/convocatorias/PresentarConvocatoria";
import PresentarConvocatoriaMates from "../pages/User/convocatorias/PresentarConvocatoriaMates";
import PresentarConvocatoriaAdministracion from "../pages/User/convocatorias/PresentarConvocatoriaAdministracion";
export default function AppRouter() {
  const { token, user, role } = useContext(AppContext);

  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <ProtectedRoute
                redirectTo="/user"
                isValid={role && role === "Director"}
              >
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<PrincipalPage />} />
            <Route path="/competencias" element={<Competencias />}></Route>
            <Route path="/categorias" element={<Categorias />}></Route>
            <Route path="/pruebas" element={<Pruebas />}></Route>
            <Route path="/preguntas" element={<Preguntas />}></Route>
            <Route path="/estudiantes" element={<Estudiantes />}></Route>
            <Route path="/convocatorias" element={<Convocatorias />}></Route>
            <Route
              path="/formularioCompetencia"
              element={<AgregarCompetencia />}
            />
            <Route path="/formularioCategoria" element={<AgregarCategoria />} />
            <Route path="/tipoPregunta" element={<SeleccionarTipoPregunta />} />
            <Route
              path="/formularioPreguntaSimple"
              element={<PreguntaSimple />}
            />
            <Route
              path="/formularioPreguntaImagen"
              element={<PreguntaImagen />}
            />
            <Route
              path="/formularioConvocatoria"
              element={<AgregarConvocatoria />}
            />
            <Route path="/crearPrueba" element={<AgregarPrueba />}></Route>
            <Route
              path="/cambiarContrasenia"
              element={<CambiarContrasenia />}
            />
            <Route path="/cambiarImagen" element={<CambiarImagen />}></Route>
            <Route path="/editarInformacion" element={<EditarInformacion />} />
            <Route
              path="/editarCompetencia/:id"
              element={<EditarCompetencia />}
            />
            <Route path="/editarCategoria/:id" element={<EditarCategoria />} />
            <Route path="/editarPregunta/:id" element={<EditarPregunta />} />
            <Route
              path="/editarEstudiante/:id"
              element={<EditarEstudiante />}
            />
            <Route path="/editarPrueba/:id" element={<EditarPrueba />} />
            <Route
              path="/editarConvocatoria/:id"
              element={<EditarConvocatoria />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                redirectTo={"/home"}
                isValid={role && role === "Estudiante"}
              >
                {<Layout />}
              </ProtectedRoute>
            }
          >
            <Route path="/user" element={<PrincipalPageUser />}></Route>
            <Route
              path="/editarInformacionEstudiante"
              element={<EditarInfoUser />}
            ></Route>
            <Route
              path="/cambiarContraseniaEstudiante"
              element={<CambiarContraseniaEstudiante/>}
            />
            <Route path="/pruebasUser" element={<PruebasUser />} />
            <Route path="/convocatoriasUser" element={<ConvocatoriaUser />} />
            <Route path="/presentarPrueba/1" element={<PresentarConvocatoria/>}></Route>
            <Route path="/presentarPrueba/2" element={<PresentarConvocatoriaMates/>}></Route>
            <Route path="/presentarPrueba/3" element={<PresentarConvocatoriaAdministracion/>}></Route>
          </Route>

          <Route path="/newPassword/:id/:token" element={<NewPassword />} />
          <Route path="/" element={<Login />}></Route>
          <Route path="/recuperarEmail" element={<EmailRecuperación />}></Route>
          <Route path="*" element={<ErrorPage role={role} />} />
        </Routes>
      </Router>
      <Toaster reverseOrder={true} />
    </>
  );
}
