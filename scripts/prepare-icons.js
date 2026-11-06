const fs = require('fs');
const sharp = require('sharp');
(async () => {
  const source = 'assets/icon.svg';
  fs.mkdirSync('assets', { recursive: true });
  await sharp(source).resize(1024, 1024).png().toFile('assets/icon.png');
  const sizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
  for (const [density, size] of Object.entries(sizes)) {
    const dir = `android/app/src/main/res/mipmap-${density}`;
    fs.mkdirSync(dir, { recursive: true });
    const png = await sharp(source).resize(size, size).png().toBuffer();
    fs.writeFileSync(`${dir}/ic_launcher.png`, png);
    fs.writeFileSync(`${dir}/ic_launcher_round.png`, png);
  }
  // Use the generated PNG launcher icons consistently on all Android versions.
  fs.rmSync('android/app/src/main/res/mipmap-anydpi-v26', { recursive: true, force: true });
})().catch(err => { console.error(err); process.exit(1); });
