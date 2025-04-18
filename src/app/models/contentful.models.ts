export interface HeroEntry {
  title: string;
  description: string;
}

export interface AuthorEntry {
  authorTitle: string;
  authorName: string;
}

export interface MetaDataEntry {
  title: string;
  description: string;
}

export interface BlogPage {
  slug: string;
  blogTitle: string;
  blogDescription: string;
  metaData?: {
    fields: MetaDataEntry;
  };
}

export interface HomePage {
  slug: string;
  section1?: {
    fields: HeroEntry;
  };
  section2?: {
    fields: AuthorEntry;
  };
  metaData?: {
    fields: MetaDataEntry;
  };
}

export interface ContentfulResponse<T> {
  items: Array<{
    fields: T;
    sys: {
      id: string;
    };
  }>;
}
