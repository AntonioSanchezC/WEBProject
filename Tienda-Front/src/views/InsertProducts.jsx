import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import useQuisco from "../hooks/useQuiosco";
import { ChromePicker } from 'react-color';

export default function InsertProducts() {
  const [color, setColor] = useState('#ffffff'); // Estado inicial del color
  const [codeColor, setCodeColor] = useState('#ffffff'); // Estado para el código de color

  const [previewImage, setPreviewImage] = useState(null);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const { categories, subCategories, obtenerSubCategoriasPorCategoria, warehouses } = useQuisco();
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleChangeCategoria = (e) => {
    const tipoCategoriaSeleccionada = e.target.value;
    obtenerSubCategoriasPorCategoria(parseInt(tipoCategoriaSeleccionada));
    const categoriaSeleccionada = categories.find((category) => category.id === parseInt(tipoCategoriaSeleccionada));
    if (categoriaSeleccionada) {
      setSelectedCategoryId(categoriaSeleccionada.id);
      setSelectedSubcategory("");
    }
  };

  const handleChangeSubcategory = (e) => {
    const subcategoriaSeleccionada = e.target.value;
    setSelectedSubcategory(subcategoriaSeleccionada);
  };

  const { getRootProps, getInputProps, isDragActive, open, removeFile } = useDropzone({
    accept: [".png", ".jpg", ".jpeg", ".gif"],
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const objectURL = URL.createObjectURL(file);
        setPreviewImage(objectURL);
        setAcceptedFiles(acceptedFiles);
      }
    },
    onDropRejected: (fileRejections) => {
      setPreviewImage(null);
      console.log(fileRejections);
    },
  });

  const nameRef = useRef();
  const genderRef = useRef(null);
  const priceRef = useRef();
  const dispRef = useRef();
  const descriptionRef = useRef();
  const sizeRef = useRef();
  const subCateRef = useRef();
  const entityRef = useRef();
  const noveRef = useRef();
  const colorRef = useRef();
  const quantityRef = useRef();
  const warehousesRef = useRef();

  const [errores, setErrores] = useState([]);
  const { insetProduct } = useAuth({
    middleware: "auth",
    url: "/",
  });

  useEffect(() => {
    console.log("El valor de color es ", color);
  }, [color]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      name: nameRef.current.value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      price: priceRef.current.value,
      disp: dispRef.current.checked ? 0 : 1,
      description: descriptionRef.current.value,
      size: sizeRef.current.value,
      color: colorRef.current.value,
      code_color: codeColor, // Añadir code_color aquí
      quantity: quantityRef.current.value,
      subcate: subCateRef.current.value,
      entity: entityRef.current.value,
      nove: noveRef.current.checked ? 0 : 1,
      warehouses: warehousesRef.current.value,
    };

    const formData = new FormData();
    formData.append("name", datos.name);
    formData.append("gender", datos.gender);
    formData.append("price", datos.price);
    formData.append("file", acceptedFiles[0]);
    formData.append("disp", datos.disp);
    formData.append("description", datos.description);
    formData.append("subcate", datos.subcate);
    formData.append("entity", datos.entity);
    formData.append("novelty", datos.nove);
    formData.append("size", datos.size);
    formData.append("color", datos.color);
    formData.append("code_color", datos.code_color); // Añadir code_color al formData
    formData.append("quantity", datos.quantity);
    formData.append("warehouses", datos.warehouses);

    insetProduct(formData, setErrores);
  };

  const handleClearFields = () => {
    nameRef.current.value = "";
    priceRef.current.value = "";
    dispRef.current.checked = false;
    descriptionRef.current.value = "";
    sizeRef.current.value = "";
    colorRef.current.value = "";
    quantityRef.current.value = "";
    subCateRef.current.value = "";
    entityRef.current.value = "";
    noveRef.current.checked = false;
    warehousesRef.current.value = "";
    setAcceptedFiles([]);
    setPreviewImage(null);
  };

  const setPreviewImageNull = () => {
    setPreviewImage(null);
  };

  return (
    <>
      <h1 className="text-4xl font-black">Productos de tienda</h1>
      <p>Inserte los datos de los productos</p>
      <div className="mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
          <div className="flex flex-wrap">
            <div className="w-1/2 pr-4">
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="name"
                  placeholder="Tu Nombre"
                  ref={nameRef}
                />
              </div>
              <div className="mb-4">
                <label className="text-slate-800">Sexo desigando:</label>
                <div>
                  <label>
                    <input type="radio" name="gender" value="F" ref={genderRef} />{" "} Femenino
                  </label>
                  <label>
                    <input type="radio" name="gender" value="M" ref={genderRef} />{" "} Masculino
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="price">Precio:</label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="price"
                  placeholder="Precio del producto"
                  ref={priceRef}
                />
              </div>
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="quantity">Cantidad:</label>
                <input
                  type="quantity"
                  step="0.01"
                  id="quantity"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="quantity"
                  placeholder="Cantidad del producto"
                  ref={quantityRef}
                />
              </div>
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="image">Añadir Imagen:</label>
                <div {...getRootProps()} className="dropzone">
                  <input type="file" name="file" {...getInputProps()} />
                  {acceptedFiles.length > 0 ? (
                    acceptedFiles.map((file) => (
                      <div key={file.name}>
                        <p>Archivo seleccionado: {file.name}</p>
                        <button onClick={() => [setPreviewImageNull(), removeFile(file)]}>Eliminar archivo</button>
                      </div>
                    ))
                  ) : isDragActive ? (
                    <p>Suelta los archivos aquí...</p>
                  ) : (
                    <p>Arrastra y suelta archivos aquí o haz clic para subir.</p>
                  )}
                </div>
                {previewImage && (
                  <div>
                    <img src={previewImage} alt="Vista previa" className="max-w-xs mt-4" />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="text-slate-800">Disponibilidad:</label>
                <div>
                  <label>
                    <input type="radio" name="disp" value="1" ref={dispRef} />{" "} Disponible
                  </label>
                  <label>
                    <input type="radio" name="disp" value="0" ref={dispRef} />{" "} No disponible
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-slate-800">¿Es una novedad?:</label>
                <div>
                  <label>
                    <input type="radio" name="nove" value="1" ref={noveRef} />{" "} Novedad
                  </label>
                  <label>
                    <input type="radio" name="nove" value="0" ref={noveRef} />{" "} No es novedad
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="description">Descripción:</label>
                <input
                  type="text"
                  id="description"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="description"
                  placeholder="Descripción de producto"
                  ref={descriptionRef}
                />
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="size">Talla:</label>
                <input
                  type="text"
                  id="size"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="size"
                  placeholder="Talla de producto"
                  ref={sizeRef}
                />
              </div>
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="color">Nombre del Color:</label>
                <input
                  type="text"
                  id="color"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="color"
                  placeholder="Color de producto"
                  ref={colorRef}
                />
              </div>
              <div className="mb-4">
                <label className="text-slate-800" htmlFor="code_color">Código de Color:</label>
                <ChromePicker
                  color={color}
                  onChange={(newColor) => {
                    setColor(newColor.hex); // Actualiza el estado del color cuando cambia
                    setCodeColor(newColor.hex); // Actualiza el estado del código de color
                  }}
                />
              </div>
              <div className="mb-4">
                <select
                  id="category"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="category"
                  htmlFor="category"
                  onChange={handleChangeCategoria}
                >
                  <option value="" disabled selected>
                    Seleccione una categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <select
                  id="subcate"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="subcate"
                  htmlFor="subcate"
                  ref={subCateRef}
                  onChange={handleChangeSubcategory}
                >
                  <option value="" disabled selected>
                    Seleccione una subcategoría
                  </option>
                  {subCategories
                    .filter((sub) => sub.parent_category_id === selectedCategoryId)
                    .map((sub, index) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <select
                  id="warehouse"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="warehouse"
                  htmlFor="warehouse"
                  ref={warehousesRef}
                  onChange={handleChangeSubcategory}
                  defaultValue=""
                >
                  <option value="" disabled selected>
                    Seleccione el almacen donde es guardado
                  </option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <input type="hidden" name="product" value="product" ref={entityRef} />
          <div className="flex">
            <input
              type="submit"
              value="Subir Producto"
              className="bg-white w-1/2 hover:bg-zinc-700 text-black hover:text-white md:mt-12 p-0 uppercase font-bold cursor-pointer md:h-16"
            />
            <input
              type="button"
              value="Borrar campos"
              onClick={handleClearFields}
              className="bg-red-500 w-1/2 md:h-16 text-white px-4 py-2 md:mt-12 hover:bg-red-600"
            />
          </div>
        </form>
      </div>
    </>
  );
}
