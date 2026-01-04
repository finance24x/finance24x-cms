import type { Schema, Struct } from '@strapi/strapi';

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
      'layout.app-download': LayoutAppDownload;
      'layout.contact-info': LayoutContactInfo;
      'layout.link': LayoutLink;
      'layout.link-column': LayoutLinkColumn;
      'layout.social-link': LayoutSocialLink;
      'sections.cta': SectionsCta;
      'sections.feature-card': SectionsFeatureCard;
      'sections.hero': SectionsHero;
      'sections.stats-item': SectionsStatsItem;
      'seo.meta': SeoMeta;
    }
  }
}
