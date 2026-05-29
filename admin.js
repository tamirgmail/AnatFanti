const adminStorageKey = "anat-fanti-site-content";
const credentials = {
  email: "anat_fanti@yahoo.com",
  password: "lapetitefanti66"
};

const adminDefaultContent = {
  email: "anat_fanti@yahoo.com",
  heroImage: "Media/anat-fanti-hero-transparent.png",
  theme: "scholar",
  en: {
    name: "Anat Fanti",
    credential: "PhD Candidate in Wellbeing & Happiness",
    heroTitle: "Evidence-based ideas for happier, healthier lives.",
    heroText:
      "Anat translates research on wellbeing, resilience, and human flourishing into clear talks, interviews, and practical tools for organizations, conferences, and public audiences.",
    statement: "Bridging academic research, public conversation, and practical wellbeing strategy.",
    workTitle: "Research with a human voice",
    workBody:
      "Anat works at the intersection of happiness research, positive psychology, and everyday decision-making. Her work helps audiences understand what wellbeing really means and how it can be cultivated in families, workplaces, and communities.",
    metricOneValue: "25+",
    metricOneLabel: "Interviews and media features",
    metricTwoValue: "3",
    metricTwoLabel: "Signature lecture formats",
    metricThreeValue: "2",
    metricThreeLabel: "Languages: English and Hebrew",
    mediaTitle: "Interviews, talks, and articles",
    speakingTitle: "Talks designed for thoughtful audiences",
    contactTitle: "Book a lecture, interview, or conference appearance.",
    contactBody:
      "Share a few details about the event, audience, date, and preferred language. Anat will follow up with availability and the best format for your audience.",
    location: "Based in Israel. Available internationally.",
    media: [
      { type: "video", title: "Wellbeing and happiness interview", source: "YouTube", description: "A video appearance that plays directly inside the website.", url: "https://youtu.be/hxET80-D3cc?si=h-BzmDP_Pp_ftMa-", embedUrl: "" },
      { type: "video", title: "Social media clip", source: "Facebook", description: "A managed video link. Add an embeddable URL in the admin if Facebook allows inline playback.", url: "https://www.facebook.com/share/r/18g5vNMyUg/?mibextid=wwXIfr", embedUrl: "" },
      { type: "video", title: "Television item", source: "IFAT", description: "A managed TV item link. Add an embed URL if the provider exposes one.", url: "https://share.ifat.com/item?encID=lxcuPWatPBipAT5anmp6RgxEqualsXxEqualsX&itemType=tv", embedUrl: "" }
    ],
    talks: [
      { title: "The Architecture of Wellbeing", description: "A flagship lecture on the habits, environments, and relationships that support flourishing." },
      { title: "Happiness at Work", description: "A practical session for teams and leaders who want measurable wellbeing without slogans." }
    ]
  },
  he: {
    name: "ענת פנטי",
    credential: "דוקטורנטית בתחום רווחה נפשית ואושר",
    heroTitle: "רעיונות מבוססי מחקר לחיים מאושרים ובריאים יותר.",
    heroText: "ענת מתרגמת מחקר על רווחה נפשית, חוסן ושגשוג אנושי להרצאות, ראיונות וכלים פרקטיים לארגונים, כנסים וקהל רחב.",
    statement: "חיבור בין מחקר אקדמי, שיחה ציבורית ואסטרטגיות מעשיות לרווחה נפשית.",
    workTitle: "מחקר עם קול אנושי",
    workBody: "ענת עוסקת בנקודת המפגש שבין חקר האושר, פסיכולוגיה חיובית וקבלת החלטות יומיומית.",
    metricOneValue: "+25",
    metricOneLabel: "ראיונות ואזכורים בתקשורת",
    metricTwoValue: "3",
    metricTwoLabel: "פורמטים מרכזיים להרצאות",
    metricThreeValue: "2",
    metricThreeLabel: "שפות: עברית ואנגלית",
    mediaTitle: "ראיונות, הרצאות ומאמרים",
    speakingTitle: "הרצאות לקהלים חושבים",
    contactTitle: "לתיאום הרצאה, ראיון או הופעה בכנס.",
    contactBody: "ספרו כמה פרטים על האירוע, הקהל, התאריך והשפה המועדפת.",
    location: "מבוססת בישראל. זמינה גם לאירועים בינלאומיים.",
    media: [
      { type: "video", title: "ראיון בנושא רווחה נפשית ואושר", source: "YouTube", description: "הופעת וידאו שנפתחת ישירות בתוך האתר.", url: "https://youtu.be/hxET80-D3cc?si=h-BzmDP_Pp_ftMa-", embedUrl: "" }
    ],
    talks: [
      { title: "הארכיטקטורה של רווחה נפשית", description: "הרצאת דגל על הרגלים, סביבות ויחסים שתומכים בשגשוג." },
      { title: "אושר בעבודה", description: "מפגש פרקטי לצוותים ומנהלים שרוצים רווחה מדידה בלי סיסמאות." }
    ]
  }
};

let content = loadAdminContent();
let editorLang = "en";
let editorTab = "pages";
let selectedMediaIndex = null;
let selectedTalkIndex = null;

function loadAdminContent() {
  const saved = localStorage.getItem(adminStorageKey);
  if (!saved) return structuredClone(adminDefaultContent);
  return mergeAdminContent(structuredClone(adminDefaultContent), JSON.parse(saved));
}

function mergeAdminContent(base, incoming) {
  return {
    ...base,
    ...incoming,
    en: { ...base.en, ...(incoming.en || {}) },
    he: { ...base.he, ...(incoming.he || {}) }
  };
}

function renderEditor() {
  document.getElementById("editorTitle").textContent = {
    pages: "Pages",
    text: "Text",
    media: "Articles & videos",
    talks: "Talks",
    design: "Design"
  }[editorTab];
  document.querySelectorAll("[data-editor-tab]").forEach((button) => button.classList.toggle("active", button.dataset.editorTab === editorTab));
  document.querySelectorAll("[data-editor-lang]").forEach((button) => button.classList.toggle("active", button.dataset.editorLang === editorLang));
  const panel = document.getElementById("editorPanel");
  panel.innerHTML = {
    pages: renderPagesPanel,
    text: renderTextPanel,
    media: renderMediaPanel,
    talks: renderTalksPanel,
    design: renderDesignPanel
  }[editorTab]();
}

function field(label, path, value, multiline = false) {
  return `<label><span>${label}</span>${
    multiline
      ? `<textarea rows="4" data-path="${path}">${escapeHtml(value || "")}</textarea>`
      : `<input data-path="${path}" value="${escapeAttribute(value || "")}" />`
  }</label>`;
}

function renderPagesPanel() {
  const data = content[editorLang];
  return `
    <section class="editor-section">
      <h3>Hero page</h3>
      ${field("Main title", `${editorLang}.heroTitle`, data.heroTitle, true)}
      ${field("Subtitle", `${editorLang}.heroText`, data.heroText, true)}
      ${field("Hero image path", "heroImage", content.heroImage)}
    </section>
    <section class="editor-section">
      <h3>Contact page</h3>
      ${field("Contact title", `${editorLang}.contactTitle`, data.contactTitle, true)}
      ${field("Contact body", `${editorLang}.contactBody`, data.contactBody, true)}
      ${field("Contact email", "email", content.email)}
      ${field("Location", `${editorLang}.location`, data.location)}
    </section>`;
}

function renderTextPanel() {
  const data = content[editorLang];
  return `
    <section class="editor-section">
      <h3>About text</h3>
      ${field("Name", `${editorLang}.name`, data.name)}
      ${field("Statement", `${editorLang}.statement`, data.statement, true)}
      ${field("Section title", `${editorLang}.workTitle`, data.workTitle)}
      ${field("Body", `${editorLang}.workBody`, data.workBody, true)}
    </section>
    <section class="editor-section">
      <h3>Numbers</h3>
      ${field("Metric 1 value", `${editorLang}.metricOneValue`, data.metricOneValue)}
      ${field("Metric 1 label", `${editorLang}.metricOneLabel`, data.metricOneLabel)}
      ${field("Metric 2 value", `${editorLang}.metricTwoValue`, data.metricTwoValue)}
      ${field("Metric 2 label", `${editorLang}.metricTwoLabel`, data.metricTwoLabel)}
      ${field("Metric 3 value", `${editorLang}.metricThreeValue`, data.metricThreeValue)}
      ${field("Metric 3 label", `${editorLang}.metricThreeLabel`, data.metricThreeLabel)}
    </section>`;
}

function renderMediaPanel() {
  const selectedItem =
    selectedMediaIndex === null ? null : content[editorLang].media[selectedMediaIndex];
  return `
    <section class="editor-section">
      <div class="editor-section-header">
        <div>
          <h3>Articles & videos</h3>
          <p>Click edit to change an item, or use plus to add a new article/video.</p>
        </div>
        <button class="editor-plus" type="button" id="editorAddMedia" aria-label="Add article or video">+</button>
      </div>
      <div class="editor-card-grid">
        ${content[editorLang].media.map((item, index) => editorItemCard(item, index, "media", selectedMediaIndex === index)).join("")}
      </div>
      ${
        selectedItem
          ? `<div class="editor-detail">
              <div class="editor-section-header">
                <h3>Edit selected item</h3>
                <button class="secondary-button compact" type="button" data-close-editor-detail>Close</button>
              </div>
              ${field("Type: video / article / talk / interview", `media.${selectedMediaIndex}.type`, selectedItem.type)}
              ${field("Title", `media.${selectedMediaIndex}.title`, selectedItem.title)}
              ${field("Source", `media.${selectedMediaIndex}.source`, selectedItem.source)}
              ${field("Description", `media.${selectedMediaIndex}.description`, selectedItem.description, true)}
              ${field("Link", `media.${selectedMediaIndex}.url`, selectedItem.url)}
              ${field("Embed URL for non-YouTube", `media.${selectedMediaIndex}.embedUrl`, selectedItem.embedUrl || "")}
            </div>`
          : ""
      }
    </section>`;
}

function renderTalksPanel() {
  const selectedItem =
    selectedTalkIndex === null ? null : content[editorLang].talks[selectedTalkIndex];
  return `
    <section class="editor-section">
      <div class="editor-section-header">
        <div>
          <h3>Talk formats</h3>
          <p>Manage lecture formats as cards, then edit the selected talk below.</p>
        </div>
        <button class="editor-plus" type="button" id="editorAddTalk" aria-label="Add talk">+</button>
      </div>
      <div class="editor-card-grid">
        ${content[editorLang].talks.map((item, index) => editorItemCard(item, index, "talk", selectedTalkIndex === index)).join("")}
      </div>
      ${
        selectedItem
          ? `<div class="editor-detail">
              <div class="editor-section-header">
                <h3>Edit selected talk</h3>
                <button class="secondary-button compact" type="button" data-close-editor-detail>Close</button>
              </div>
              ${field("Title", `talks.${selectedTalkIndex}.title`, selectedItem.title)}
              ${field("Description", `talks.${selectedTalkIndex}.description`, selectedItem.description, true)}
            </div>`
          : ""
      }
    </section>`;
}

function editorItemCard(item, index, kind, active) {
  const type = kind === "media" ? item.type || "item" : "talk";
  const editAttr = kind === "media" ? `data-edit-media="${index}"` : `data-edit-talk="${index}"`;
  const removeAttr = kind === "media" ? `data-remove-media="${index}"` : `data-remove-talk="${index}"`;
  return `
    <article class="editor-item-card ${active ? "active" : ""}">
      <div>
        <span class="editor-item-type">${escapeHtml(type)}</span>
        <h4>${escapeHtml(item.title || "Untitled")}</h4>
        <p>${escapeHtml(item.description || item.source || "")}</p>
      </div>
      <div class="editor-card-actions">
        <button type="button" ${editAttr} aria-label="Edit ${escapeAttribute(item.title || "item")}">✎</button>
        <button type="button" ${removeAttr} aria-label="Delete ${escapeAttribute(item.title || "item")}">×</button>
      </div>
    </article>`;
}

function renderDesignPanel() {
  return `
    <section class="editor-section">
      <h3>Design</h3>
      ${field("Theme name", "theme", content.theme)}
      ${field("Hero image path", "heroImage", content.heroImage)}
      <p class="admin-note">Use Media/filename.jpg after uploading images to the Media folder and deploying.</p>
    </section>`;
}

function syncEditorInputs() {
  document.querySelectorAll("[data-path]").forEach((input) => {
    setPath(input.dataset.path, input.value);
  });
}

function setPath(path, value) {
  const parts = path.split(".");
  if (parts[0] === "media") content[editorLang].media[Number(parts[1])][parts[2]] = value;
  else if (parts[0] === "talks") content[editorLang].talks[Number(parts[1])][parts[2]] = value;
  else if (parts.length === 2) content[parts[0]][parts[1]] = value;
  else content[path] = value;
}

function saveAndPreview() {
  syncEditorInputs();
  localStorage.setItem(adminStorageKey, JSON.stringify(content));
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

document.getElementById("editorUnlock").addEventListener("click", () => {
  const email = document.getElementById("editorEmail").value.trim().toLowerCase();
  const password = document.getElementById("editorPassword").value;
  if (email !== credentials.email || password !== credentials.password) return;
  document.getElementById("editorLogin").hidden = true;
  document.getElementById("editorShell").hidden = false;
  renderEditor();
});

document.querySelectorAll("[data-editor-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    syncEditorInputs();
    editorTab = button.dataset.editorTab;
    selectedMediaIndex = null;
    selectedTalkIndex = null;
    renderEditor();
  });
});

document.querySelectorAll("[data-editor-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    syncEditorInputs();
    editorLang = button.dataset.editorLang;
    renderEditor();
  });
});

document.getElementById("editorPanel").addEventListener("click", (event) => {
  if (event.target.id === "editorAddMedia") {
    syncEditorInputs();
    content[editorLang].media.push({ type: "video", title: "New item", source: "Source", description: "Description", url: "#", embedUrl: "" });
    selectedMediaIndex = content[editorLang].media.length - 1;
    renderEditor();
  }
  if (event.target.id === "editorAddTalk") {
    syncEditorInputs();
    content[editorLang].talks.push({ title: "New talk", description: "Description" });
    selectedTalkIndex = content[editorLang].talks.length - 1;
    renderEditor();
  }
  if (event.target.dataset.editMedia !== undefined) {
    syncEditorInputs();
    selectedMediaIndex = Number(event.target.dataset.editMedia);
    renderEditor();
  }
  if (event.target.dataset.editTalk !== undefined) {
    syncEditorInputs();
    selectedTalkIndex = Number(event.target.dataset.editTalk);
    renderEditor();
  }
  if (event.target.dataset.closeEditorDetail !== undefined) {
    syncEditorInputs();
    selectedMediaIndex = null;
    selectedTalkIndex = null;
    renderEditor();
  }
  if (event.target.dataset.removeMedia !== undefined) {
    syncEditorInputs();
    content[editorLang].media.splice(Number(event.target.dataset.removeMedia), 1);
    selectedMediaIndex = null;
    renderEditor();
  }
  if (event.target.dataset.removeTalk !== undefined) {
    syncEditorInputs();
    content[editorLang].talks.splice(Number(event.target.dataset.removeTalk), 1);
    selectedTalkIndex = null;
    renderEditor();
  }
});

document.getElementById("editorSave").addEventListener("click", saveAndPreview);
document.getElementById("editorExport").addEventListener("click", () => {
  syncEditorInputs();
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "anat-fanti-content.json";
  link.click();
  URL.revokeObjectURL(url);
});
document.getElementById("editorImport").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  content = mergeAdminContent(structuredClone(adminDefaultContent), JSON.parse(await file.text()));
  saveAndPreview();
  renderEditor();
});
document.getElementById("editorReset").addEventListener("click", () => {
  localStorage.removeItem(adminStorageKey);
  content = structuredClone(adminDefaultContent);
  renderEditor();
});
