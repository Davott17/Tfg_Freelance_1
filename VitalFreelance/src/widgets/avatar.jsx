import React, { useContext, useState, useEffect, useRef } from "react";
import "../CSS/panel_lateral.css";
import { AuthContext } from "./AuthContext";
import PlaceholderAvatar from "../assets/placeholder_avatar.jpg";

function PanelLateral() {
  const { user, setUser } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(PlaceholderAvatar);
  const [isHovering, setIsHovering] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef(null); // Referencia al input file

  useEffect(() => {
    if (user && user.avatarUrl) {
      setAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowEdit(false); // Ocultar el formulario de edición al salir
  };

  const handleEditClick = () => {
    setShowEdit(true);
    inputFileRef.current.click(); // Simular un clic en el input file
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Lógica para subir la imagen al backend y actualizar el avatar del usuario
      // ...
    }
  };

  return (
    <div
      className="contenedor_lateral_cliente"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="contenedor">
        <div className="contendor_imagen">
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{ display: isHovering ? "none" : "block" }}
          />
          {isHovering && (
            <button className="edit-button" onClick={handleEditClick}>
              Editar
            </button>
          )}
          {showEdit && (
            <div className="edit-avatar-form">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputFileRef}
                style={{ display: "none" }} // Ocultar el input file
              />
              {/* Otros elementos del formulario de edición si es necesario */}
            </div>
          )}
        </div>
        {/* ... (resto del contenido del panel lateral) */}
      </div>
    </div>
  );
}

export default PanelLateral;
