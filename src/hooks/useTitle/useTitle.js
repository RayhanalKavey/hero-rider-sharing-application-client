import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Hero Rider- ${title}`;
  }, [title]);
};

export default useTitle;
