import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description?: string;
  canonical?: string;
}

export function useMeta({ title, description, canonical }: MetaOptions) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes('Motion on Native')
      ? title
      : `${title} | Motion on Native`;
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrVal] = selector.replace(/[\[\]"']/g, '').split('=');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
      setMetaTag('meta[property="og:description"]', 'content', description);
      setMetaTag('meta[property="twitter:description"]', 'content', description);
    }

    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    setMetaTag('meta[property="twitter:title"]', 'content', fullTitle);

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }
  }, [title, description, canonical]);
}
