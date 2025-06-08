export const darkGreenTheme = {
  token: {
    colorPrimary: "#27ae60",         // Canlı koyu yeşil (ana renk)
    colorBgBase: "#151d17",          // Ana arka plan (çok koyu yeşil ton)
    colorBgLayout: "#1e2b22",        // Layout arka planı (biraz daha açık)
    colorTextBase: "#e6f4ea",        // Açık yeşilimsi beyaz (yazı rengi)
    colorBorder: "#2d4735",          // Sınır rengi (yeşil-gri)
    borderRadius: 10,
    colorTextPlaceholder: "#7fbf97", // Soluk yeşil (placeholder)
  },
  components: {
    Button: {
      colorPrimary: "#27ae60",
      colorText: "#fff",
      colorBorder: "#2d4735",
      borderRadius: 10,
    },
    Input: {
      colorBgContainer: "#1e2b22",
      colorBorder: "#2d4735",
      colorText: "#e6f4ea",
      colorTextPlaceholder: "#7fbf97",
      borderRadius: 10,
    },
  },
  themeInfo: {
    themeName: "Dark Green",
    backgroundPrimary: "#151d17",      // Card ana arka planı
    backgroundSecondary: "#1e2b22",    // Card üst/alt veya detay alanı
    colorPrimary: "#27ae60",           // Ana vurgu rengi
    colorSecondary: "#14532d",         // Koyu yeşil (ikincil vurgu)
    colorText: "#e6f4ea"               // Yazı rengi
  }
};