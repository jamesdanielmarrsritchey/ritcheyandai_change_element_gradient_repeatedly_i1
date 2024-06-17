function changeBackgroundGradientLoop(elementId, startHue, endHue, transitionRate) {
  // Ensure hue values are within the 0-360 range
  startHue = Math.max(0, Math.min(startHue, 360));
  endHue = Math.max(0, Math.min(endHue, 360));

  let currentHue = startHue;
  const hueRange = Math.abs(endHue - startHue);
  const hueStep = hueRange / (transitionRate * 60); // Calculate step size based on transition rate and FPS (assuming 60fps)
  let direction = 1; // Direction of hue change: 1 for forward, -1 for reverse

  // Function to update the gradient
  const updateGradient = () => {
    // Update the current hue and reverse direction if limits are reached
    currentHue += hueStep * direction;
    if (currentHue >= endHue || currentHue <= startHue) {
      direction *= -1; // Reverse the direction
      currentHue = Math.max(startHue, Math.min(currentHue, endHue)); // Clamp to ensure hue stays within bounds
    }

    // Calculate the second hue to maintain a gradient effect
    let secondHue = currentHue + hueRange / 2;
    if (secondHue > 360) secondHue -= 360; // Wrap around if exceeding 360

    // Set the new background gradient
    document.getElementById(elementId).style.backgroundImage = `linear-gradient(to right, hsl(${currentHue}, 100%, 50%), hsl(${secondHue}, 100%, 50%))`;

    // Schedule the next update
    setTimeout(updateGradient, 1000 / 60); // Aim for 60fps
  };

  // Start the gradient update loop
  updateGradient();
}

/*
Example:

window.onload = function() {
    const element = document.querySelector("#myElement");
    if (element) {
        changeBackgroundGradientLoop('elementId', 0, 360, 10);
    }
};

OnClick Example: 

document.querySelector("#myButton").addEventListener("click", function() {
    const element = document.querySelector("#myElement");
    if (element) {
        changeBackgroundGradientLoop('elementId', 0, 360, 10);
    }
});

*/