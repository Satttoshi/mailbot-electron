import { useState } from 'react';
import json from '../../../../package.json';

function Versions() {
  const [versions] = useState(window.electron.process.versions);

  return (
    <ul className="versions flex gap-4 text-sm mt-1">
      <li className="app-version">
        {json.name} v{json.version}
      </li>
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
    </ul>
  );
}

export default Versions;
