export const darkBlueTheme = {
  themeName:"darkBlueTheme",
  token: {
    colorPrimary: "#2563eb",         // Canlı mavi (ana renk)
    colorBgBase: "#0a192f",          // Ana arka plan (çok koyu mavi)
    colorBgLayout: "#112240",        // Layout arka planı (biraz daha açık)
    colorTextBase: "#e6f1ff",        // Açık mavi-beyaz (yazı rengi)
    colorBorder: "#233554",          // Sınır rengi (mavi-gri)
    borderRadius: 10,
    colorTextPlaceholder: "#8892b0", // Placeholder rengi
  },
  components: {
    Button: {
      colorPrimary: "#2563eb",
      colorText: "#fff",
      colorBorder: "#233554",
      borderRadius: 10,
    },
    Input: {
      colorBgContainer: "#112240",
      colorBorder: "#233554",
      colorText: "#e6f1ff",
      colorTextPlaceholder: "#8892b0",
      borderRadius: 10,
    },
  },
  themeInfo: {
    themeName: "Dark Blue",
    backgroundPrimary: "#0a192f",      // Card ana arka planı
    backgroundSecondary: "#112240",    // Card üst/alt veya detay alanı
    colorPrimary: "#2563eb",           // Ana vurgu rengi
    colorSecondary: "#233554",         // İkincil vurgu (koyu mavi-gri)
    colorText: "#e6f1ff"               // Yazı rengi
  }
};