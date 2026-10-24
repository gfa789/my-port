import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppContent from "../src/AppContent";
export { pageMetadata, origin } from "../src/seo";
export function render(path) {
  return renderToString(
    <StaticRouter location={path}>
      <AppContent />
    </StaticRouter>,
  );
}
