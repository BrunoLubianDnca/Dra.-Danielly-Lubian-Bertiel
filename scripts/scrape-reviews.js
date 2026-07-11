const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Dra+Danielly+Lubian+Bertiel/@-26.9293722,-49.0653602,17z/data=!4m18!1m9!3m8!1s0x94df1941fb0a65a5:0x320f2d95fcefb286!2sDra+Danielly+Lubian+Bertiel!8m2!3d-26.9293722!4d-49.0653602!9m1!1b1!16s%2Fg%2F11nqr7yfmf!3m7!1s0x94df1941fb0a65a5:0x320f2d95fcefb286!8m2!3d-26.9293722!4d-49.0653602!9m1!1b1!16s%2Fg%2F11nqr7yfmf";

async function scrapeReviews() {
  console.log("Iniciando o scraper com Playwright...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "pt-BR",
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  try {
    console.log("Navegando para o Google Maps...");
    await page.goto(GOOGLE_MAPS_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(4000);

    // Seleciona a seção rolável dos depoimentos
    const scrollableSelector = "div[role='feed']";
    const isFeedExist = await page.locator(scrollableSelector).count();
    let scrollableElement;
    if (isFeedExist > 0) {
      scrollableElement = page.locator(scrollableSelector).first();
    } else {
      scrollableElement = page.locator(".m6QErb.D3312f.w77wfe").first();
    }

    console.log("Rolando depoimentos para carregar mais avaliações...");
    if (await scrollableElement.count() > 0) {
      for (let i = 0; i < 4; i++) {
        await scrollableElement.evaluate((el) => el.scrollTop = el.scrollHeight);
        await page.waitForTimeout(1500);
      }
    }

    // Expandir botões "Mais" para ver depoimentos longos
    const expandButtons = page.locator("button:has-text('Mais'), button[aria-label*='Mais']");
    const btnCount = await expandButtons.count();
    console.log(`Expandindo ${btnCount} avaliações longas...`);
    for (let i = 0; i < btnCount; i++) {
      try {
        await expandButtons.nth(i).click({ timeout: 2000 });
        await page.waitForTimeout(300);
      } catch (e) {
        // Ignora erros ao clicar em botões específicos
      }
    }

    // Seletor geral de cards de avaliação
    const reviewCards = page.locator("div[data-review-id]");
    const count = await reviewCards.count();
    console.log(`Encontradas ${count} avaliações. Extraindo informações...`);

    const reviews = [];
    for (let i = 0; i < Math.min(count, 12); i++) {
      const card = reviewCards.nth(i);
      
      // Nome do autor
      const nameEl = card.locator(".d4r55, .TSr2qc, div.d4r55");
      const name = await nameEl.first().textContent().then(t => t?.trim() || "Paciente").catch(() => "Paciente");

      // Estrelas (aria-label como "5 estrelas" ou similar)
      const starsEl = card.locator("span[aria-label*='estrela'], span[aria-label*='star']");
      let rating = 5;
      try {
        const label = await starsEl.first().getAttribute("aria-label");
        if (label) {
          const match = label.match(/(\d+)/);
          if (match) rating = parseInt(match[1]);
        }
      } catch (e) {}

      // Data relativa (ex: 'há 1 semana')
      const dateEl = card.locator(".rsqaFe");
      const date = await dateEl.first().textContent().then(t => t?.trim() || "há 1 semana").catch(() => "há 1 semana");

      // Conteúdo do texto
      const textEl = card.locator(".wiI7sc");
      let text = "";
      try {
        text = await textEl.first().textContent().then(t => t?.trim() || "");
      } catch (e) {}

      if (text) {
        reviews.push({
          name,
          rating,
          date,
          text,
          avatarUrl: null
        });
      }
    }

    if (reviews.length > 0) {
      const dataPath = path.resolve(__dirname, "../src/data/reviews.json");
      fs.writeFileSync(dataPath, JSON.stringify(reviews, null, 2), "utf-8");
      console.log(`Sucesso! ${reviews.length} avaliações gravadas em: ${dataPath}`);
    } else {
      console.log("Nenhuma avaliação com texto foi extraída.");
    }

  } catch (err) {
    console.error("Erro durante a raspagem:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

scrapeReviews();
