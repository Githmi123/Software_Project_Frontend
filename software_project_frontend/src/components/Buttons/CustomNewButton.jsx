import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import { Button, Tooltip } from "@mui/material";
import "./CustomNewButton.css";
import * as pdfjsLib from "pdfjs-dist/webpack";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const CustomNewButton = ({ text, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileSelect(event);
    }
  };

  // const handleFileSelect = async (event) => {
  //   const files = event.target.files;
  //   if (!files || files.length === 0) {
  //     return;
  //   }

  //   const convertedFiles = await Promise.all(
  //     Array.from(files).map(async (file) => {
  //       if (file.type === "application/pdf") {
  //         return await convertPdfToImages(file);
  //       } else {
  //         return { file }; // Directly return non-PDF files wrapped in an object
  //       }
  //     })
  //   );

  //   // Flatten the array of arrays into a single array of files
  //   const allFiles = convertedFiles.flat();
  //   onFileSelect(allFiles); // Pass all files to parent component
  // };

  // const convertPdfToImages = async (file) => {
  //   const arrayBuffer = await file.arrayBuffer();
  //   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  //   const numPages = pdf.numPages;
  //   const images = [];

  //   for (let i = 1; i <= numPages; i++) {
  //     const page = await pdf.getPage(i);
  //     const viewport = page.getViewport({ scale: 1 });
  //     const canvas = document.createElement("canvas");
  //     const context = canvas.getContext("2d");
  //     canvas.width = viewport.width;
  //     canvas.height = viewport.height;

  //     const renderContext = {
  //       canvasContext: context,
  //       viewport: viewport,
  //     };

  //     await page.render(renderContext).promise;
  //     const imageUrl = canvas.toDataURL("image/jpeg");
  //     images.push({ file, url: imageUrl }); // Store file and its image URL
  //   }
  //   return images;
  // };

  return (
    <div className="custom-button-container">
      <Tooltip title={text} arrow>
        <Button
          className="custom-button"
          startIcon={<AddCircleIcon />}
          onClick={handleButtonClick}
        >
          {text}
        </Button>
      </Tooltip>
      <VisuallyHiddenInput
        ref={fileInputRef}
        type="file"
        accept=".jpeg, .png, .jpg, .pdf"
        multiple
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default CustomNewButton;
