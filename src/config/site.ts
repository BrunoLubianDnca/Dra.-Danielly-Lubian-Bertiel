export const siteConfig = {
  whatsappNumber: "554788397897",
  whatsappMessage: "Olá! Vim do Google e gostaria de saber mais sobre a consulta da Dra",
  get whatsappUrl() {
    return `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodeURIComponent(this.whatsappMessage)}`;
  }
};
