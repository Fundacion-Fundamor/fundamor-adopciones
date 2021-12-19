import { AiOutlineDashboard, AiOutlineFolderOpen, AiOutlineQuestionCircle, AiOutlineUnorderedList, AiOutlineUser } from "react-icons/ai";
import { IoPawOutline } from "react-icons/io5";
import {FiUsers} from "react-icons/fi"
import { BsDot, BsNewspaper } from "react-icons/bs";


/**Rutas privadas a las que puede acceder un colaborador
 * 
 */
export const userRouters = [

    {

        name: "Escritorio",
        icon: <AiOutlineDashboard stroke="2" size={"20"}/>,
        path: '/dashboard',

    },
    {

        name: "Animales",
        icon: <IoPawOutline size={"20"} />,
        path: "/animals",
        exact: true,
    },
    {

        name: "Adopciones",
        icon: <AiOutlineFolderOpen size={"20"} />,
        children: [
            {

                name: "Lista",
                path: "/adoptions",
                icon: <BsDot  />,
            },
            {

                name: "Preguntas",
                path: "/questions",
                icon: <BsDot />,
            }
        ]
    },
    {
        icon: <FiUsers size={"20"} />,
        name: "Adoptantes",
        path: "/adopters",
    },
    {
        icon: <BsNewspaper size={"20"} />,
        name: "Publicaciones",
        path: "/posts",
    },
    {
        icon: <AiOutlineUser size={"20"} />,
        name: "Colaboradores",
        path: "/employees",
    },


]