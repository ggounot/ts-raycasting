const loadTexture = () => {
  const wallImage = new Image();
  wallImage.src = "./assets/wall.jpg";
  const wallLightImage = new Image();
  wallLightImage.src = "./assets/wall-light.jpg";
  return {
    wall: wallImage,
    wallLight: wallLightImage,
  };
};
