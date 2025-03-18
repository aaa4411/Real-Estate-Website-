import React from "react";
import { Helmet } from "react-helmet";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  const fullTitle = title.includes("RealEstateAI")
    ? title
    : `${title} - RealEstateAI`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:title" content={fullTitle} />
    </Helmet>
  );
};

export default PageTitle;
