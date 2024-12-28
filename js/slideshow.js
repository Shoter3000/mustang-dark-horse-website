// JavaScript for slideshow and SVG color management

// Slideshow functionality
let currentSlide = 0;
const carImages = [
  "img/MustangColors/AtlasBlueMetallic.png",
  "img/MustangColors/CarbonizedGrayMetallic.png", 
  "img/MustangColors/DarkMatterGrayMetallic.png",
  "img/MustangColors/GrabberBlueMetallic.png",
  "img/MustangColors/IconicSilverMetallic.png",
  "img/MustangColors/OxfordWhite.png",
  "img/MustangColors/RapidRedMetallic.png",
  "img/MustangColors/ShadowBlack.png",
  "img/MustangColors/VaporBlueMetallic.png",
];


function changeSlide(direction) {
  currentSlide = (currentSlide + direction + carImages.length) % carImages.length;
  document.getElementById("carImage").src = carImages[currentSlide];
  
  const colorMap = {
    "img/MustangColors/AtlasBlueMetallic.png": { color: "rgb(2, 48, 90)", name: "Atlas Blue Metallic" },
    "img/MustangColors/CarbonizedGrayMetallic.png": { color: "rgb(76, 87, 101)", name: "Carbonized Gray Metallic" },
    "img/MustangColors/DarkMatterGrayMetallic.png": { color: "rgb(52, 57, 64)", name: "Dark Matter Gray Metallic" },
    "img/MustangColors/GrabberBlueMetallic.png": { color: "rgb(15, 130, 188)", name: "Grabber Blue Metallic" },
    "img/MustangColors/IconicSilverMetallic.png": { color: "rgb(136, 149, 170)", name: "Iconic Silver Metallic" },
    "img/MustangColors/OxfordWhite.png": { color: "rgb(214, 220, 235)", name: "Oxford White" },
    "img/MustangColors/RapidRedMetallic.png": { color: "rgb(141, 27, 34)", name: "Rapid Red Metallic" },
    "img/MustangColors/ShadowBlack.png": { color: "rgb(5, 5, 5)", name: "Shadow Black" },
    "img/MustangColors/VaporBlueMetallic.png": { color: "rgb(88, 125, 156)", name: "Vapor Blue Metallic" }
  };
  
  const currentColorInfo = colorMap[carImages[currentSlide]];
  updateSvgColor(currentColorInfo.color);
  document.getElementById("colorName").textContent = currentColorInfo.name;
}


// SVG color update
function updateSvgColor(color) {
  const svgElement = document.querySelector("#colorSvgContainer svg");
  const selectedColor = color || document.getElementById("colorPicker").value;
  if (svgElement) {
    svgElement.querySelectorAll("path").forEach(path => path.setAttribute("fill", selectedColor));
  }
  
  if (!color) {
    document.getElementById("colorName").textContent = "Custom Color";
  }
}

// Load SVG dynamically
function loadSvg() {
  fetch("img/FordMustang.svg")
    .then(response => response.text())
    .then(svgContent => {
      document.getElementById("colorSvgContainer").innerHTML = svgContent;
      updateSvgColor("rgb(2, 48, 90)");
    })
    .catch(error => console.error("Error loading SVG:", error));
}

// Initialize slideshow and SVG color picker
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("colorPicker").addEventListener("change", () => {
    updateSvgColor();
  });

  // Set initial image and SVG
  document.getElementById("carImage").src = carImages[currentSlide];
  loadSvg();
});