import type { Schema, Struct } from '@strapi/strapi';

export interface CommunityProgram extends Struct.ComponentSchema {
  collectionName: 'components_community_programs';
  info: {
    description: 'Community program or activity';
    displayName: 'Program';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['education', 'social', 'religious', 'cultural', 'youth']
    > &
      Schema.Attribute.DefaultTo<'education'>;
    contact_person: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    schedule: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'community.program': CommunityProgram;
    }
  }
}
