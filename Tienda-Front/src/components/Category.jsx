import React from "react";
import useQuisco from "../hooks/useQuiosco";

export default function Category({ category }) {
  const { handleClickCategoria, currentCategory } = useQuisco();
  const { id, name } = category;

  console.log("category en Category es", category);

  const resaltarCategoriaActual = () =>
  currentCategory.id === id ? "bg-green-500" : "bg-white";

  const handleClick = () => {
    console.log("Categoría clickeada:", category);
    handleClickCategoria(id);
  };

  console.log("Los datos de categoria ",currentCategory);
  return (
    <div
      className={`${resaltarCategoriaActual()} 
      flex items-center gap-4  w-full p-3  cursor-pointer`}
    >
      <button
        className="text-lg font-bold cursor-pointer truncate"
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
}
