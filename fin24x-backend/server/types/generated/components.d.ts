import type { Schema, Struct } from '@strapi/strapi';

export interface CalculatorFaq extends Struct.ComponentSchema {
  collectionName: 'components_calculator_faqs';
  info: {
    description: 'Frequently Asked Question';
    displayName: 'FAQ';
    icon: 'question-circle';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutAppDownload extends Struct.ComponentSchema {
  collectionName: 'components_layout_app_downloads';
  info: {
    description: 'App store download button';
    displayName: 'App Download';
    icon: 'download';
  };
  attributes: {
    badgeImage: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.Enumeration<['google-play', 'app-store']> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_layout_contact_infos';
  info: {
    description: 'Contact information component';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface LayoutLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_links';
  info: {
    description: 'Reusable link component';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LayoutLinkColumn extends Struct.ComponentSchema {
  collectionName: 'components_layout_link_columns';
  info: {
    description: 'A column of links for footer';
    displayName: 'Link Column';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'layout.link', true>;
  };
}

export interface LayoutSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_links';
  info: {
    description: 'Social media link with platform identifier';
    displayName: 'Social Link';
    icon: 'hashtag';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'youtube',
        'tiktok',
        'google',
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MarketMarketItem extends Struct.ComponentSchema {
  collectionName: 'components_market_market_items';
  info: {
    description: 'Single market data item (Gold, Silver, NIFTY, etc.)';
    displayName: 'Market Item';
    icon: 'chartLine';
  };
  attributes: {
    changePercent: Schema.Attribute.Decimal;
    changeValue: Schema.Attribute.Decimal;
    currentPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
    name: Schema.Attribute.Enumeration<
      [
        'Gold',
        'Silver',
        'NIFTY',
        'SENSEX',
        'BANKNIFTY',
        'MIDCAP100',
        'SMALLCAP100',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface SectionGridItem extends Struct.ComponentSchema {
  collectionName: 'components_section_grid_items';
  info: {
    description: 'Item for grid-type sections (courses, cards, etc.)';
    displayName: 'Grid Item';
    icon: 'grid';
  };
  attributes: {
    actionText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'View'>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    iconText: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    publishedDate: Schema.Attribute.Date & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionGridItemWithDate extends Struct.ComponentSchema {
  collectionName: 'components_section_grid_item_with_dates';
  info: {
    description: 'Item for grid-type sections with date display (events, IPOs, etc.)';
    displayName: 'Grid Item with Date';
    icon: 'calendar';
  };
  attributes: {
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    iconText: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    publishedDate: Schema.Attribute.Date & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionNewsItem extends Struct.ComponentSchema {
  collectionName: 'components_section_news_items';
  info: {
    description: 'Item for news-type sections (large or small news articles)';
    displayName: 'News Item';
    icon: 'file';
  };
  attributes: {
    author: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'admin'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    isLarge: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    publishDate: Schema.Attribute.Date & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    description: 'Call to action section';
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    button: Schema.Attribute.Component<'layout.link', false>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_cards';
  info: {
    description: 'Feature or benefit card';
    displayName: 'Feature Card';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: 'Hero banner section';
    displayName: 'Hero';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    primaryButton: Schema.Attribute.Component<'layout.link', false>;
    secondaryButton: Schema.Attribute.Component<'layout.link', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStatsItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats_items';
  info: {
    description: 'Single stat counter item';
    displayName: 'Stats Item';
    icon: 'chartBubble';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_metas';
  info: {
    description: 'SEO metadata for pages';
    displayName: 'Meta';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'calculator.faq': CalculatorFaq;
      'layout.app-download': LayoutAppDownload;
      'layout.contact-info': LayoutContactInfo;
      'layout.link': LayoutLink;
      'layout.link-column': LayoutLinkColumn;
      'layout.social-link': LayoutSocialLink;
      'market.market-item': MarketMarketItem;
      'section.grid-item': SectionGridItem;
      'section.grid-item-with-date': SectionGridItemWithDate;
      'section.news-item': SectionNewsItem;
      'sections.cta': SectionsCta;
      'sections.feature-card': SectionsFeatureCard;
      'sections.hero': SectionsHero;
      'sections.stats-item': SectionsStatsItem;
      'seo.meta': SeoMeta;
    }
  }
}
