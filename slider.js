function updateSlider(element) {
      const min = parseFloat(element.min) || 0;
      const max = parseFloat(element.max) || 100;
      const val = parseFloat(element.value);

    // 2. Calculate the percentage: ((current - min) / (max - min)) * 100
    const percentage = ((val - min) / (max - min)) * 100;
      // We apply the background directly to 'this' (the element passed)
      element.style.background = `linear-gradient(to right, yellow ${percentage}%, grey ${percentage}%)`;
      element.setAttribute("value", val)
    }