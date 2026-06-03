perl -pi -e 's/>Next</>{t.next}</g; s/>Finish</>{t.finish}</g' app/*/page.tsx
perl -pi -e 's/Boy or Girl\?/Мальчик или девочка?/g; s/Birth weight\?/Вес при рождении?/g; s/Birth time\?/Время рождения?/g; s/Eye color\?/Цвет глаз?/g; s/Birth hair color\?/Цвет волос при рождении?/g' app/*/page.tsx

# summary/reveal RU/EN
python3 - << 'PY'
from pathlib import Path

p = Path("app/reveal/page.tsx")
p.write_text('''"use client";

import { useEffect, useState } from "react";
import { dict, getLang, Lang } from "../lib/i18n";

export default function RevealPage() {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => setLang(getLang()), []);

  const t = dict[lang];

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{t.accepted}</h1>
        <p className="text-gray-500">{t.thanks}</p>
      </div>
    </main>
  );
}
''')

print("OK i18n pages patched")
PY

npm run build
