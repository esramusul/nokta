# Nokta Away Mission — 231118021 / Esra Musul

Track: A

> **Track A — Sadelik (Drop-in Primitive Disiplini)**

---

## 🎯 Track Seçimi

**Track A — Sadelik (Drop-in Primitive Disiplini)** seçildi.

Ham fikir (text input) → AI mühendislik mülakatı (3 soru: Problem, Kullanıcı, Kapsam) → Tek sayfalık profesyonel product spec üretimi.

### Ana Akış (Eksiksiz)

```
[Kullanıcı fikir girer]
        ↓
[AI 3 mühendislik sorusu üretir]   ← generateEngineeringQuestions()
        ↓
[Kullanıcı her soruyu yanıtlar]    ← InterviewScreen (soru soru)
        ↓
[AI yanıtları birleştirip Spec üretir] ← generateFinalSpec()
        ↓
[Markdown formatında Product Spec gösterilir + paylaşılabilir]
```

### 🧠 Expert Support & HOOP (Human-on-the-loop)
Standart AI akışının yetersiz kaldığı veya kullanıcının stratejik bir derinliğe ihtiyaç duyduğu anlarda devreye giren **Strateji Uzmanı** modülü eklendi. Bu modül:
- **HOOP Mantığı:** AI'nın genel yeteneklerinden ziyade, belirli bir "Senior Product Manager" personasına bürünmüş, daha kısıtlı ama daha derinlemesine bir uzmanlık sunar.
- **Dinamik Sohbet:** Kullanıcı, fikrinin pazar değerini veya teknik uygulanabilirliğini bu uzmanla birebir tartışabilir.

---

## 🐛 Audit Widget Entegrasyonu

`@xtatistix/mobile-audit` paketi **drop-in** olarak `app/_layout.tsx` dosyasının kök bileşenine tek satır mount edildi:

```tsx
<AuditWidget deps={auditDeps} />
```

**Drop-in prensibi korundu:** Widget kaldırıldığında uygulama eksiksiz çalışmaya devam eder.

```bash
grep -r 'AuditWidget' app/
# Sonuç: app/app/_layout.tsx: <AuditWidget deps={auditDeps} />
```

Bağımlılık enjeksiyonu host uygulamasından yapıldı — widget içine hiçbir native paket import edilmedi.

### Üretilen Audit Raporları (audit-reports/)

| Rapor | Ekran | Tespit |
|---|---|---|
| `bug-report-2026-05-18-14-10.md` | `/` (index) | CTA buton gradient rengi zayıf |
| `bug-report-2026-05-18-14-11.md` | `/interview` | Placeholder metni çok karanlık |
| `bug-report-2026-05-18-14-12.md` | `/result` | "Yeni Fikir Başlat" butonu stil tutarsız |
| `bug-report-2026-05-18-14-13.md` | `/expert` | Back button eksik iddiası (rollback) |

---

## ⚙️ Forge Cycle Özeti (FORGE.md)

| # | Ekran | Hipotez | Sonuç | kg |
|---|---|---|---|---|
| 1 | index | CTA gradient parlaklaştırma | ✅ success | 1 |
| 2 | interview | Placeholder opacity artırma | ✅ success | 1 |
| 3 | result | Finish button → LinearGradient | ✅ success | 2 |
| 4 | expert | Back button eksik hipotezi | ❌ rollback | 0 |

**Human touch points:** 1 (Cycle 4'te agent durdurulup kod doğrulandı)
**Detay:** `FORGE.md`

---

## 📱 Expo Bağlantısı

**Yerel başlatma:**
```bash
cd submissions/231118021-nokta-vision/app
npm install
npx expo start
```

**Expo QR / Preview Linki:**
> `exp://172.20.10.2:8081`

---

## 🎬 Demo Video

| Alan | Link |
|------|------|
| 60 sn Demo Video | https://youtube.com/shorts/S0M6sqqnHxM?feature=share |
| **Android APK** | `app-release.apk` (Root dizininde mevcut) |

---

## 🛠️ Teknik Yığın

| Katman | Teknoloji |
|--------|-----------|
| Framework | React Native + Expo (v54.0.33) |
| Architecture | **New Architecture (React Native 0.81.5 / React 19)** |
| Routing | Expo Router (file-based) |
| AI Servisi | OpenRouter API (Multi-model Fallback: Gemini 2.0, Llama 3.3, Qwen 2.5) |
| Animasyon | React Native Reanimated v3 (Worklets enabled) |
| UI | LinearGradient, Glassmorphism, Custom Markdown renderer |
| Audit Widget | @xtatistix/mobile-audit (drop-in, host boundary korundu) |
| Storage | @react-native-async-storage/async-storage |

---

## 📋 Karar Günlüğü (Decision Log)

| Saat | Karar | Gerekçe |
|------|-------|---------|
| 10:09 | Track A seçildi | Nokta'nın çekirdek değer önerisi "slop-free ideation" ile en doğrudan örtüşüyor |
| 10:15 | Expo Router kullanıldı | File-based routing ile 3 ekran (index → interview → result) hızlı kuruldu |
| 10:30 | Gemini API → OpenRouter değiştirildi | Gemini v1beta 404 hatası verdi; OpenRouter ücretsiz ve stabil alternatif sundu |
| 10:45 | Multi-model Fallback eklendi | Tek modele bağlı kalmamak için Gemini 2.0, Llama 3.3 ve Qwen 2.5 modelleri arasında otomatik geçiş sağlandı |
| 11:00 | Retry logic eklendi | Ücretsiz modeller zaman zaman 429 dönüyor; 15/30/45s backoff ile otomatik yeniden deneme |
| 11:10 | Türkçe prompt | Kullanıcı deneyimini lokalize etmek için prompt dili Türkçe'ye alındı |
| 11:15 | Custom Markdown renderer yazıldı | React Native'de sıfırdan renderer — `##`, `-`, `**` parse edilip stilize native component |
| 22:30 | Expert Support (HOOP) eklendi | Stratejik derinlik için ayrı bir persona tanımlandı |
| 22:45 | Groq/Llama-3.3 Entegrasyonu | Uzman desteği için daha yüksek parametreli model tercih edildi |
| Forge-1 | AuditWidget mount edildi | `_layout.tsx`'e tek satır drop-in, host boundary kuralına uygun |
| Forge-2 | 4 audit raporu üretildi | 4 farklı ekranda widget tetiklendi, raporlar `audit-reports/`'a eklendi |
| Forge-3 | 3 başarılı + 1 rollback cycle | FORGE.md'ye loglandı; rollback hipotez çürümesinden kaynaklandı |

---

## 🤖 AI Tool Kullanım Logu

| Araç | Kullanım |
|---|---|
| Antigravity (Google DeepMind) | Tüm kod üretimi, FORGE cycle yönetimi, Audit Widget entegrasyonu |
| OpenRouter (Gemini 2.0 / Llama 3.3 / Qwen 2.5) | Runtime AI servisi (uygulama içi) |

---

## ✨ Özellikler

- **AI Mühendislik Mülakatı** — 3 kritik soruyla fikri derine inen yapılandırılmış akış
- **Akıllı Retry** — Rate limit'te otomatik bekleme + yeniden deneme
- **Türkçe Deneyim** — Tüm sorular ve spec çıktısı Türkçe
- **Premium UI** — Glow efektleri, glassmorphism kartlar, slide animasyonları
- **Paylaş** — Üretilen spec anında Share API ile paylaşılabilir
- **Custom Markdown** — `##`, bullet, kalın metin native olarak stilize render
- **Stratejik Uzman Desteği (HOOP)** — Ürün stratejisi konusunda danışmanlık veren özel AI personası
- **Drop-in Audit Widget** — Kaldırılabilir; app çalışmaya devam eder

---

## 📁 Klasör Yapısı

```
231118021-nokta-vision/
├── README.md          ← bu dosya
├── FORGE.md           ← forge cycle ledger (≥3 success + ≥1 rollback)
├── idea.md            ← track için özelleşmiş fikir dosyası
├── audit-reports/     ← ≥4 audit raporu (.md)
│   ├── bug-report-2026-05-18-14-10.md  (index)
│   ├── bug-report-2026-05-18-14-11.md  (interview)
│   ├── bug-report-2026-05-18-14-12.md  (result)
│   └── bug-report-2026-05-18-14-13.md  (expert)
└── app/               ← Expo projesi (audit widget entegre)
    ├── app/
    │   ├── _layout.tsx    ← <AuditWidget /> buraya mount (tek satır)
    │   ├── index.tsx      ← Karşılama & fikir girişi
    │   ├── interview.tsx  ← AI mülakat akışı
    │   ├── result.tsx     ← Product spec görüntüleme
    │   └── expert.tsx     ← Stratejik uzman desteği (HOOP)
    └── services/
        └── gemini.ts      ← AI servisleri (OpenRouter)
```

---

*Geliştirici: Esra Musul — 231118021*
*AI araçları: Antigravity (Google DeepMind) — tüm kod üretimi ve forge döngüleri loglandı.*
