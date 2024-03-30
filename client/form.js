const dropZone = document.querySelector(".drop-zone");

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("active");
});

dropZone.addEventListener("dragleave", (event) => {
  event.preventDefault();
  dropZone.classList.remove("active");
});

dropZone.addEventListener("drop", async (event) => {
  event.preventDefault();
  console.log("drop");
  dropZone.classList.remove("active");
  const file = event.dataTransfer.files[0]; // Obtener el primer archivo soltado

  if (file) {
    const formData = new FormData(); // Crear objeto FormData
    formData.append("file", file); // Agregar el archivo al FormData

    try {
      const response = await fetch("../server/uploads", {
        // Realizar la solicitud POST al servidor
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Archivo enviado exitosamente.");
      } else {
        console.error("Error al enviar el archivo:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }
});

const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", () => {
  const files = fileInput.files;
  handleFiles(files);
});

function handleFiles(files) {
  for (const file of files) {
    console.log(file.name);
    // Aquí puedes enviar los archivos al servidor para su procesamiento utilizando AJAX o Fetch API

    if (files.length > 0) {
      const file = files[0]; // Tomar solo el primer archivo, pero puedes manejar varios si es necesario

      const formData = new FormData(); // Crear un objeto FormData para enviar el archivo al servidor
      formData.append("file", file); // Agregar el archivo al FormData

      fetch("./server/uploads/", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Archivo enviado exitosamente al servidor.");
            // Aquí puedes hacer algo adicional después de enviar el archivo
          } else {
            console.error("Error al enviar el archivo al servidor.");
          }
        })
        .catch((error) => {
          console.error("Error de red:", error);
        });
    }
  }
}
