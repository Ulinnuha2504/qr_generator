const qrContainer = document.getElementById("qrCode");

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "",
  image: "",
  dotsOptions: {
    color: "#000000",
    type: "rounded"
  },
  backgroundOptions: {
    color: "#ffffff"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 5
  },
  qrOptions: {
    errorCorrectionLevel: "M"
  }
});

qrCode.append(qrContainer);

const inputs = {
  data: document.getElementById("qrData"),
  size: document.getElementById("qrSize"),
  color: document.getElementById("qrColor"),
  bg: document.getElementById("bgColor"),
  error: document.getElementById("errorLevel"),
  logo: document.getElementById("logoInput"),
  logoSize: document.getElementById("logoSize")
};

function updateQR() {
  const size = Number(inputs.size.value);
  const logoScale = Number(inputs.logoSize.value) / 100;

  qrCode.update({
    width: size,
    height: size,
    data: formatData(inputs.data.value),
    dotsOptions: {
      color: inputs.color.value
    },
    backgroundOptions: {
      color: inputs.bg.value
    },
    imageOptions: {
      imageSize: logoScale,
    },
    qrOptions: {
      errorCorrectionLevel: inputs.error.value
    }
  });
}

function formatData(value) {
  if (/^\d{8,15}$/.test(value)) {
    return `https://wa.me/${value}`;
  }
  return value;
}

inputs.logo.addEventListener("change", () => {
  const file = inputs.logo.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    qrCode.update({
      image: e.target.result
    });
  };
  reader.readAsDataURL(file);
});

Object.values(inputs).forEach(input => {
  input.addEventListener("input", updateQR);
});

document.getElementById("downloadPNG").onclick = () => {
  qrCode.download({ name: "qr-code", extension: "png" });
};

document.getElementById("downloadSVG").onclick = () => {
  qrCode.download({ name: "qr-code", extension: "svg" });
};
