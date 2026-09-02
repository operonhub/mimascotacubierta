// Helpers de datos estructurados (JSON-LD).
// Todo el sitio comparte un único bloque <script> con @graph, armado en BaseHead:
// Organization + WebSite van siempre; cada página suma sus nodos vía la prop `schema`.

export const SITE_URL = 'https://www.mimascotacubierta.com';
export const SITE_NAME = 'MiMascotaCubierta';

/** Convierte una ruta relativa en URL absoluta y canónica del sitio. */
export const abs = (path = '/'): string => new URL(path, `${SITE_URL}/`).href;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: abs('/logo-full.svg'),
  },
  email: 'admin@operonhub.com',
  // sameAs: [...redes]  ← pendiente (Bloque B2)
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'es',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export interface Crumb {
  name: string;
  /** Ruta relativa con barra final, p. ej. "/comparar/" */
  path: string;
}

/** BreadcrumbList a partir de las migas que ya se muestran en pantalla. */
export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

export interface ListEntry {
  name: string;
  path: string;
}

/** CollectionPage para hubs y listados; opcionalmente con ItemList de sus items. */
export const collectionPageSchema = ({
  name,
  description,
  path,
  items = [],
}: {
  name: string;
  description: string;
  path: string;
  items?: ListEntry[];
}) => ({
  '@type': 'CollectionPage',
  '@id': `${abs(path)}#collectionpage`,
  name,
  description,
  url: abs(path),
  isPartOf: { '@id': `${SITE_URL}/#website` },
  ...(items.length
    ? {
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            url: abs(it.path),
          })),
        },
      }
    : {}),
});

/** FAQPage a partir de un array {q, a} o {question, answer}. */
export const faqPageSchema = (
  faqs: Array<{ q?: string; a?: string; question?: string; answer?: string }>,
) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q ?? f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.a ?? f.answer },
  })),
});
