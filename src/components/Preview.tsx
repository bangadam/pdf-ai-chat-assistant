"use client";

import { useEffect, useState } from "react";
import * as pdfobject from "pdfobject";

interface PreviewProps {
  fileToPreview: File;
  page?: number;
}

const Preview: React.FC<PreviewProps> = ({ fileToPreview, page = 1 }) => {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    const options = {
      title: fileToPreview.name,
      pdfOpenParams: {
        view: "fitH",
        page: page,
        zoom: "scale,left,top",
        pageMode: "none",
      },
    };

    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.readAsDataURL(fileToPreview);
    if (base64) {
      pdfobject.embed(base64, "#pdfobject", options);
    }
  }, [page, base64]);

  return <div className="flex-grow roundex-xl" id="pdfobject"></div>;
};

export default Preview;
