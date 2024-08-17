import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: { ...globals.browser, ...globals.node } }},
  pluginJs.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      // disabled rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];
