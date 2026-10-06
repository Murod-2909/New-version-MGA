import React from "react";
import Spinner from "../Spinner";

// On a pre-rendered page the browser shows the static HTML before React has loaded.
// While the first page is still loading (lazy chunk or API data) we keep that markup
// on screen under the spinner, so the content doesn't disappear and re-appear and
// push the footer around (a large layout shift). It is only used for the URL the
// document was loaded with; any other page gets the plain spinner.
const initialPath = typeof window !== "undefined" ? window.location.pathname : null;
const snapshot =
  typeof document !== "undefined" ? document.getElementById("main")?.innerHTML || "" : "";

const PageLoading = () => {
  const useSnapshot = snapshot && window.location.pathname === initialPath;
  return (
    <>
      {useSnapshot && <div dangerouslySetInnerHTML={{ __html: snapshot }} />}
      <Spinner position="full" />
    </>
  );
};

export default PageLoading;
