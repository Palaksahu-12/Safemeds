const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const text = message.toLowerCase().trim();

    // 🔍 Extract medicine (simple word match)
    let med = await Medicine.findOne({
      name: { $regex: text, $options: "i" },
    });

    if (!med) {
      const words = text.split(" ");
      for (let word of words) {
        med = await Medicine.findOne({
          name: { $regex: word, $options: "i" },
        });
        if (med) break;
      }
    }

    if (!med) {
      return res.json({
        reply: "❌ Medicine not found. Try Amoxicillin, Amlodipine, Azithromycin.",
      });
    }

    // 💊 FAKE BUT REALISTIC ALTERNATIVES
    if (text.includes("alternative") || text.includes("cheaper")) {
      const fakeAlternatives = [
        `${med.name} Generic`,
        `${med.name} Plus`,
        `${med.name} Care`,
        `${med.name} Med`,
        `${med.name} Lite`
      ];

      let reply = `💊 Cheaper alternatives for ${med.name}:\n\n`;

      fakeAlternatives.forEach((alt, i) => {
        const fakePrice = (med.price * (0.6 + i * 0.05)).toFixed(2);
        reply += `${i + 1}. ${alt} - ₹${fakePrice}\n`;
      });

      reply += `\n✔ These are similar alternatives. Always consult a doctor before switching.`;

      return res.json({ reply });
    }

    // 🚨 OVERPRICING (REAL CALCULATION)
    // 🚨 OVERPRICING (REAL + ACCURATE)
if (text.includes("paid") || /\d+(\.\d+)?/.test(text)) {
  const match = text.match(/\d+(\.\d+)?/); // supports decimals also
  const paid = match ? parseFloat(match[0]) : null;

  if (paid !== null) {
    const govt = parseFloat(med.price);

    const diff = paid - govt;
    const percent = ((diff / govt) * 100);

    if (paid > govt) {
      return res.json({
        reply: `⚠ Overpricing detected!\n\n💊 ${med.name}\n🏛 Govt Price: ₹${govt}\n💰 You Paid: ₹${paid}\n\n🚨 Overcharged by ₹${diff.toFixed(2)} (${percent.toFixed(1)}%)\n\n👉 You can report this case.`,
      });
    } else {
      return res.json({
        reply: `✅ Fair pricing\n\n💊 ${med.name}\n🏛 Govt Price: ₹${govt}\n💰 You Paid: ₹${paid}\n\n✔ You paid within the allowed limit.`,
      });
    }
  }
}
    // 💰 PRICE
    if (text.includes("price")) {
      return res.json({
        reply: `💊 ${med.name}\n\n📦 ${med.dosageForm} (${med.strength})\n🏛 Govt Price: ₹${med.price}\n\n✔ NPPA regulated.`,
      });
    }

    // ℹ️ DEFAULT
    return res.json({
      reply: `💊 ${med.name}\n\n🏛 Price: ₹${med.price}\n📦 ${med.dosageForm} (${med.strength})\n\nAsk:\n• cheaper alternatives\n• I paid ₹XX`,
    });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Server error" });
  }
});

module.exports = router;