import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../reduxToolkit/servesSlice";
import { getItemSlug } from "../data/production-content";

// Production capabilities (UV printing, CNC, ...) for the menus: [{ slug, title }].
// They come from the services API, so the menu loads them if nothing has yet.
const useProductionLinks = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.servicesSlider?.servicesData);
  const error = useSelector((state) => state.servicesSlider?.error);
  const hasData = Array.isArray(data) && data.length > 0;

  useEffect(() => {
    if (!hasData && !error) dispatch(getServices());
  }, [dispatch, hasData, error]);

  return useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((item) => ({ slug: getItemSlug(item), title: item?.title }))
        .filter((link) => link.slug && link.title),
    [data]
  );
};

export default useProductionLinks;
